import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bidRoutes from "./routes/bid.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userRoutes from "./routes/user.routes.js";


const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

export default app;
