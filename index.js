import express from 'express';
import QRCode from 'qrcode';
import axios from 'axios';
import { router as userRoutes } from "./routes/userRoutes.js"
import { router as transactionRoutes } from "./routes/transactionRoutes.js";
import dotenv from "dotenv"
import connectDB from "./connect.js"
import decodeToken from './utils/decodeDataFromToken.js';

dotenv.config()
connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.post("/api/generate/", async (req, res) => {
    let token;
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZkNzUzZWUyYWY2OGYwYWE5ZDBhNTMiLCJpYXQiOjE2OTQzMzI4NjUsImV4cCI6MTY5NjkyNDg2NX0.FgREMSxXXoIewmbIb5FUPsvjn95EdZm2ysXcbw4A4xs"

    const { amount, service } = req.body;
    const { name, email, bic, idno, iban } = await decodeToken(token);
    const qrcode = await composeTransfer({name, email, bic, idno, iban, amount, service});
    const markup = `<img src="${qrcode}"></img>`
    res.send(markup);
})

async function composeTransfer(data) {
    try {
        const qr = await QRCode.toDataURL(JSON.stringify(data));
        return qr;
    } catch(err) {
        console.log(err);
    }
}



app.listen(port, () => {
    console.log("Listening on port 3000");
})