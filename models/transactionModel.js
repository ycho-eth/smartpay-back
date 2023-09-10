import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    fromAccount: {
        type: String,
        required: true
    },
    toIDNO: {
        type: String,
        required: true
    },
    iban: {
        type: String,
        required: true
    },
    bic: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: false
    }, 
    createdAt: {
        type: Date,
        required: true
    }
}, {
    timestamp: true
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction