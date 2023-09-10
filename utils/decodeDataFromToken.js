import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

async function decodeToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    return user;
}

export default decodeToken