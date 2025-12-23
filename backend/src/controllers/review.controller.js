import Review from "../models/Review.model.js";
import User from "../models/User.model.js";

export const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    const reviews = await Review.find({
      targetUserId: req.body.targetUserId
    });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await User.findByIdAndUpdate(req.body.targetUserId, {
      "reputation.rating": avgRating,
      $inc: { "reputation.completedJobs": 1 }
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
