import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["customer", "provider"],
      required: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        
      }
    },

    radius: {
      type: Number,
      default: 5
    },

    skills: [String], // only for providers

    reputation: {
      rating: {
        type: Number,
        default: 0
      },
      completedJobs: {
        type: Number,
        default: 0
      }
    }
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

export default mongoose.model("User", userSchema);
