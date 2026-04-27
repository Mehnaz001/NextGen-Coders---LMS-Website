import uploadOnCloudinary from '../config/cloudinary.js';
import User from '../model/userModel.js';

export const getCurrentUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // ✅ Get user without pagination first to get real total
        const user = await User.findById(req.userId)
            .select("-password")
            .populate({
                path: 'enrolledCourses',
                select: 'title thumbnail price category',
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Get real total before slicing
        const total = user.enrolledCourses.length;

        // ✅ Manually paginate after populate
        const paginatedCourses = user.enrolledCourses.slice(skip, skip + limit);

        // ✅ Use toObject() instead of _doc spread
        const userData = user.toObject();

        return res.status(200).json({
            ...userData,
            enrolledCourses: paginatedCourses,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return res.status(500).json({ message: `Error in getting current user ${error}` });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { description, name } = req.body;

        let photoUrl;
        if (req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path);
        }

        // ✅ Only update fields that were actually sent
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (photoUrl) updateData.photoUrl = photoUrl;

        // ✅ Use {new: true} to return updated doc, removed redundant save()
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Error in updating profile ${error}` });
    }
};