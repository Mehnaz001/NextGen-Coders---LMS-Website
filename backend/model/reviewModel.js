import mongoose, { Schema } from 'mongoose'

const reviewSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    comment:{
        type:String,
        trim:true
    },
    reviewedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

// Add indexes for faster queries
reviewSchema.index({ course: 1 });
reviewSchema.index({ user: 1 });

const Review = mongoose.model('Review',reviewSchema)

export default Review