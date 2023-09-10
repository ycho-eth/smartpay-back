import express from "express";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import getUser from "../utils/getUserByToken.js";

export const router = express.Router();

router.post("/login", async (req, res) => {
    const { idno, password } = req.body;
    console.log(idno);
    const user = await User.findOne({ idno });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        const { name, email, bic, iban } = user;
        res.json({ name, email, bic, idno, iban })
    } else {
        res.status(401);
        throw new Error("Invalid Credentials !");
    }
})


router.post("/register", async (req, res) => {
    const { name, email, password, bic, idno, iban } = req.body;
    console.log(name, iban)
    const userExists = await User.findOne({ idno });
    if (userExists) {
        res.sendStatus(400);
        throw new Error('User already exists');
    } else {
        const user = await User.create({ name, email, password, bic, idno, iban });
        if (user) {
            console.log(user);
            generateToken(res, user._id);
            res.json({ name, email, bic, idno, iban });
        } else {
            res.status(400);
            throw new Error("Invalid user data !")
        }
    }
})

router.post("/logout", async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
})

router.post("/getUser", getUser);