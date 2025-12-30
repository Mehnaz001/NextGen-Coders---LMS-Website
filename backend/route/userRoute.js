import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { getCurrentUSer } from '../controller/userController';

const userRouter = express.Router();
userRouter.get('/getcurrentuser',isAuth, getCurrentUSer )

export default userRouter