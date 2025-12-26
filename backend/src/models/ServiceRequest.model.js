import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "COMPLETED"],
      default: "OPEN",
    },

    assignedProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewGiven: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

serviceRequestSchema.index({ location: "2dsphere" });

export default mongoose.model("ServiceRequest", serviceRequestSchema);
