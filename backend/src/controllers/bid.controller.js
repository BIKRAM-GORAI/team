import Bid from "../models/Bid.model.js";

// export const placeBid = async (req, res) => {
//   try {
//     const bid = await Bid.create(req.body);
//     res.status(201).json(bid);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const placeBid = async (req, res) => {
  try {
    const bid = await Bid.create({
      serviceRequestId: req.body.serviceRequestId,
      price: req.body.price,
      estimatedTime: req.body.estimatedTime,
      providerId: req.user.id // ✅ LOGGED-IN PROVIDER ONLY
    });

    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getBids = async (req, res) => {
  try {
    const bids = await Bid.find({
      serviceRequestId: req.params.serviceId
    }).populate("providerId", "name reputation");

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
