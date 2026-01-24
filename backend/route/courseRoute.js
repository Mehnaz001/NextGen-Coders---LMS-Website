import express from "express"
import { createCourse, editCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse } from "../controller/courseController.js"
import upload from '../middleware/multer.js';
import isAuth from '../middleware/isAuth.js';

const courseRouter = express.Router()

courseRouter.post('/create', isAuth, createCourse)
courseRouter.post('/editcourse/:courseId', isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get('/getpublished', getPublishedCourses)
courseRouter.get('/getcreator', isAuth, getCreatorCourses)
courseRouter.get('/getcourse/:courseId', isAuth, getCourseById)
courseRouter.get('/remove/:courseId', isAuth, removeCourse)

export default courseRouter