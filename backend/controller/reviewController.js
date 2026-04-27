import Course from "../model/courseModel.js";
import Review from "../model/reviewModel.js";

export const createReview = async (req, res) => {
    try {
        const { rating, comment, courseId } = req.body;
        const userId = req.userId;

        // ✅ Validate required fields
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        if (!rating) {
            return res.status(400).json({ message: "Rating is required" });
        }
        if (!comment) {
            return res.status(400).json({ message: "Comment is required" });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // ✅ 404 for missing resource
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found!" });
        }

        const alreadyReviewed = await Review.findOne({ course: courseId, user: userId });
        if (alreadyReviewed) {
            return res.status(400).json({ message: "You have already reviewed this course" });
        }

        const review = new Review({
            course: courseId,
            user: userId,
            rating,
            comment
        });
        await review.save();

        // ✅ push() is synchronous, only save() needs await
        course.reviews.push(review._id);
        await course.save();

        // ✅ 201 for resource creation
        return res.status(201).json(review);
    } catch (error) {
        return res.status(500).json({ message: `Error in creating review ${error}` });
    }
};

export const getReviews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const reviews = await Review.find({})
            .populate('course', 'title thumbnail')
            .populate('user', 'name photoUrl role')
            // ✅ createdAt is the correct Mongoose default field, not reviewedAt
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Review.countDocuments({});

        return res.status(200).json({
            reviews,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return res.status(500).json({ message: `Failed to get reviews ${error}` });
    }
};