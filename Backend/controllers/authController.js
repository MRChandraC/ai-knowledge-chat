const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register new user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ email, passwordHash: hashedPassword });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
