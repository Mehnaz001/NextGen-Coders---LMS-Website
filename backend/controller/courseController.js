import Course from "../model/courseModel.js"
import uploadOnCloudinary from '../config/cloudinary.js';

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
        const courses = await Course.find({isPublished:true})
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
        let course = await Course.findById(courseId)
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