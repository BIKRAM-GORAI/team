import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    serviceRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    message: {
      type: String
    },

    estimatedTime: {
      type: String
    }
  },
  { timestamps: true }
);

// Prevent multiple bids by same provider on same job
bidSchema.index(
  { serviceRequestId: 1, providerId: 1 },
  { unique: true }
);

export default mongoose.model("Bid", bidSchema);
