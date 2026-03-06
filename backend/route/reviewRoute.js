import express from 'express'
import { createReview, getReviews } from '../controller/reviewController.js'
import isAuth from '../middleware/isAuth.js';

const reviewRouter = express.Router()
reviewRouter.post('/createreview',isAuth, createReview)
reviewRouter.get('/allreviews',getReviews)


export default reviewRouter