import uploadOnCloudinary from '../config/cloudinary.js';
import User from '../model/userModel.js'

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: `Error in UserController in getting current user ${error}`})
    }
}

export const updateProfile = async (req,res) => {
    try {
        let userId = req.userId
        const {description, name} = req.body
        let photoUrl
        if(req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path)
        }

        const user = await User.findByIdAndUpdate(userId, {name,description,photoUrl})
         if(!user) {
            return res.status(404).json({message:"User not found"});
        }
        await user.save()
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message: `Error in Updating the Profile ${error}`})
    }
}