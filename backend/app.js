import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import authRouter from './route/authRoute.js';
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';
import reviewRouter from './route/reviewRoute.js';


import cors from 'cors'
import paymentRouter from './route/paymentRoute.js';
dotenv.config()

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "https://next-gen-coders-lms-website-g8a1.vercel.app/",
    credentials:true
}))

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)
app.use('/api/course', courseRouter)
app.use('/api/order', paymentRouter)
app.use('/api/review',reviewRouter)

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
    connectDB();
})
