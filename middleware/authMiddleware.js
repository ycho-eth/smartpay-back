import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async(req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch(err) {
            console.log(err);
            res.status(401);
            throw new Error("Not authorized, token failed !")
        }
    } else {
        throw new Error("Not authorized, no token !")
    }
}

export { protect };