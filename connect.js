import mongoose from "mongoose"

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(conn.connection.host);
    
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

export default connectDB;