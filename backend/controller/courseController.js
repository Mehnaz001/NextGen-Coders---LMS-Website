import Course from "../model/courseModel.js"
import User from "../model/userModel.js"
import uploadOnCloudinary from '../config/cloudinary.js';
import Lecture from "../model/lectureModel.js";

export const createCourse = async(req,res) => {
    try {
        const {title,category} = req.body
        if(!title)
            return res.status(400).json({message:"Title is required"})
        if(!category)
            return res.status(400).json({message:"Category is required"})

        const course = await Course.create({
            title,
            category,
            creator:req.userId
        })

        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message: `Creating Course ${error}`})
    }
}

export const getPublishedCourses = async (req,res) => {
    try {
        const courses = await Course.find({isPublished:true}).populate("lectures")
        if(!courses) {
            return res.status(400).json({message:"Course not found"})
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({message: `Failed to find published courses ${error}`})
    }
}

export const getCreatorCourses = async(req,res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({creator:userId})
        if(!courses) {
            return res.status(400).json({message:"Course not found"})
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({message: `Failed to find published courses ${error}`})
    }
}

export const editCourse = async (req,res) => {
    try {
        const {courseId} = req.params
        const {title, subTitle, description, category, level, isPublished, price} = req.body
        let thumbnail
        if(req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path) 
        }
        let course = await Course.findById(courseId)
        if(!course) {
            return res.status(404).json({message:"Course not found"})
        }

        const updateData = {title, subTitle, description, category, level, isPublished, price, thumbnail}
        await Course.findByIdAndUpdate(courseId, updateData, {new:true})
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message: `Failed to edit Course ${error}`}) 
    }
}

export const getCourseById = async (req,res) => {
    try {
        const {courseId} = req.params
        let course = await Course.findById(courseId).populate("lectures")
        if(!course) {
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message: `Error in getting Course ${error}`})
    }
}

export const removeCourse = async (req, res) => {
    try {
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course) {
            return res.status(404).json({message:"Course not found"})
        }
        await Course.findByIdAndDelete(courseId, {new:true})
        return res.status(200).json({json:"Course removed"})
    } catch (error) {
        return res.status(500).json({message: `Error in deleting course ${error}`})
    }
}

//For Lectures

export const createLecture = async (req,res) => {
    try {
        const {lectureTitle} = req.body
        const {courseId} = req.params

        if(!lectureTitle || !courseId) {
            return res.status(400).json({message:"Lecture Title is required"})
        }

        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)

        if(course) {
           await course.lectures.push(lecture._id)
        }

        await course.populate("lectures")
        await course.save()

        return res.status(201).json({course,lecture})
    } catch (error) {
        return res.status(500).json({message: `Failed to create lecture ${error}`})
    }
}

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course) {
            return res.status(404).json({message:"Course not found"})
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json({course})
    } catch (error) {
        return res.status(500).json({message: `Failed to getCourseLecture ${error}`})
    }
}

export const editLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const {isPreviewFree , lectureTitle} = req.body
        const lecture = await Lecture.findById(lectureId)
        if(!lecture) {
            res.status(404).json({messsage:"Lecture not found"})
        }
        let videoUrl
        if(req.file) {
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if(lectureTitle) {
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree

        await lecture.save()
        return res.status(200).json({lecture})
    } catch (error) {
        return res.status(500).json({message: `Failed to edit Lecture ${error}`})
    }
}

export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)

        if(!lecture) {
            return res.status(404).json({message:"Lecture is not found"})
        }
        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )

        return res.status(200).json({message:"Lecture Removed"})
    } catch (error) {
        return res.status(500).json({message: `Failed to remove Lecture ${error}`})
    }
}

//get Creator
export const getCreatorById = async (req,res) => {
    try {
        const {userId} = req.body
        const user = await User.findById(userId).select('-password')

        if(!user) {
            return res.status(404).json({message:"User not found"})
        }

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message: `Failed to get Creator ${error}`})
    }
}