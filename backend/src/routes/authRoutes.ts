import express from "express";
import bcrypt from "bcryptjs";
import pool from "../database";

const router = express.Router();

// User Registration Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if(!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    // Check if user already exists
    const conn = await pool.getConnection();
    const existingUser = await conn.query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    await conn.query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
    );

    conn.release();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

export default router;