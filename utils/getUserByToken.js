import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const getUser = async (req, res) => {
    let token;
    token = req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            const user = await User.findById(decoded.userId).select('-password');
            res.json(user);
        } catch(err) {
            console.log(err);
            res.status(401);
            throw new Error("Not authorized, token failed !")
        }
    } else {
        throw new Error("Not authorized, no token !")
    }
}

export default getUser