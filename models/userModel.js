import mongoose from "mongoose";
import { sha256 } from "js-sha256" 

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bic: {
        type: String,
        required: true
    },
    idno: {
        type: String,
        required: true
    },
    iban: {
        type: String,
        required: true
    }
}, {
    timestamp: true
});

userSchema.pre("save", async function(next) {
    if(!this && this.isModified('password')) {
        next();
    }

    this.password = sha256(this.password);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    const encryptedPassword = sha256(enteredPassword);
    return (encryptedPassword == this.password);
}

const User = mongoose.model("User", userSchema);

export default User
