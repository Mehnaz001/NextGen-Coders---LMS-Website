import express from "express"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorById, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from "../controller/courseController.js"
import upload from '../middleware/multer.js';
import isAuth from '../middleware/isAuth.js';
import { searchWithAi } from "../controller/searchContoller.js";
import { freeEnroll } from "../controller/courseController.js";

const courseRouter = express.Router()

//for courses
courseRouter.post('/create', isAuth, createCourse)
courseRouter.post('/editcourse/:courseId', isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get('/getpublished', getPublishedCourses)
courseRouter.get('/getcreator', isAuth, getCreatorCourses)
courseRouter.get('/getcourse/:courseId', isAuth, getCourseById)
courseRouter.get('/remove/:courseId', isAuth, removeCourse)
courseRouter.post('/free-enroll', isAuth, freeEnroll);

//For lectures
courseRouter.post('/createlecture/:courseId', isAuth, createLecture)
courseRouter.get('/courselecture/:courseId', isAuth, getCourseLecture )
courseRouter.post('/editlecture/:lectureId', isAuth,upload.single("videoUrl"), editLecture)
courseRouter.delete('/removelecture/:lectureId', isAuth, removeLecture)
courseRouter.post('/creator', isAuth, getCreatorById)

//For search
courseRouter.post('/search', searchWithAi)

export default courseRouter