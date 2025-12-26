import Review from "../models/Review.model.js";
import User from "../models/User.model.js";
import ServiceRequest from "../models/ServiceRequest.model.js";

// export const addReview = async (req, res) => {
//   try {
//     const review = await Review.create(req.body);

//     const reviews = await Review.find({
//       targetUserId: req.body.targetUserId,
//     });

//     const avgRating =
//       reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

//     await User.findByIdAndUpdate(req.body.targetUserId, {
//       "reputation.rating": avgRating,
//       $inc: { "reputation.completedJobs": 1 },
//     });


//     await ServiceRequest.findByIdAndUpdate(serviceRequestId, {
//       reviewGiven: true,
//     });

//     res.status(201).json(review);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const addReview = async (req, res) => {
  try {
    const { serviceRequestId } = req.body;

    const review = await Review.create(req.body);

    await ServiceRequest.findByIdAndUpdate(serviceRequestId, {
      reviewGiven: true
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({
      targetUserId: req.params.userId,
    })
      .populate("reviewerId", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
