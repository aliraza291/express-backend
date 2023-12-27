const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");
const authorizeMiddleware = require("../middleware/authorize");

router.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get(
  "/api/users",
  authMiddleware,
  authorizeMiddleware(["admin"]),
  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post("/api/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
