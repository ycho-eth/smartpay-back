import express from "express";
import Transaction from "../models/transactionModel.js";
import decodeToken from "../utils/decodeDataFromToken.js";

export const router = express.Router();

router.get("/getAll", async (req, res) => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZkNzYxNmUyYWY2OGYwYWE5ZDBhNTkiLCJpYXQiOjE2OTQzMzQ3NzcsImV4cCI6MTY5NjkyNjc3N30.BLS5ZVwRVcqfZ05euKKXwbG-aybR12MdIvVh_OtfKaU";
    // token = req.cookies.jwt;
    if (token) {
        const { idno } = await decodeToken(token);
        console.log(idno);
        const transactions = await Transaction.find({ toIDNO: idno });
        console.log(transactions)
        if(transactions.length) {
            res.json({transactions});
        } else {
            res.status(400);
            throw new Error("No transactions !")
        }
    } else {
        throw new Error("Not authorized, no token !")
    }
})



// for testing and filling database
router.post("/addTransaction", async (req, res) => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZkNzUzZWUyYWY2OGYwYWE5ZDBhNTMiLCJpYXQiOjE2OTQzMzI4NjUsImV4cCI6MTY5NjkyNDg2NX0.FgREMSxXXoIewmbIb5FUPsvjn95EdZm2ysXcbw4A4xs";
    // token = req.cookies.jwt;

    const { fromAccount, toIDNO, amount, currency, destination } = req.body;
    const { iban, bic } = await decodeToken(token);
    const createdAt = new Date();

    const transaction = await Transaction.create({fromAccount, toIDNO, iban, bic, amount, currency, destination, createdAt});

    if(transaction) {
        res.send(`Transaction with id ${transaction._id} succesfully created !`);
    } else {
        res.sendStatus(400);
        throw new Error("Failed to create a transaction");
    }
})