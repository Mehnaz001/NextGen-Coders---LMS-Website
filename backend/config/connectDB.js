import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully")
    }catch(e) {
        console.log(e)
    }
}

export default connectDB;