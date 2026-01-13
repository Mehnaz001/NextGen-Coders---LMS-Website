import express from 'express';
import { signUp, login, logOut, sendOTP, verifyOTP, resetPassword , googleAuth} from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signUp)
authRouter.post('/login', login)
authRouter.get('/logout', logOut)
authRouter.post('/sendotp', sendOTP)
authRouter.post('/verifyotp', verifyOTP)
authRouter.post('/resetpassword', resetPassword)
authRouter.post('/googleauth', googleAuth)

export default authRouter;