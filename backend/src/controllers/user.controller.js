// import User from "../models/User.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role, location, radius } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       location,
//       radius
//     });

//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
import User from "../models/User.model.js";

export const updateLocation = async (req, res) => {
  try {
    const { location, radius } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      location,
      radius
    });

    res.json({ message: "Location updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "name email role"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
