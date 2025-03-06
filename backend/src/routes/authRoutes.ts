import express from "express";
import bcrypt from "bcryptjs";
import pool from "../database";
import { generateToken, verifyToken } from "../jwtUtils";

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

// USER LOGIN ROUTE

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if(!email || !password) {
            res.status(400).json({ success: false, message: "All fields are required"});
            return;
        }
        const conn = await pool.getConnection();
        const user = await conn.query("SELECT * FROM users WHERE email = ?", [email]);

        if(user.length === 0) {
            conn.release();
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return;
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user[0].password_hash);
        
        if(!isMatch) {
            res.status(400).json({ success: false, message: "Invalid email or password" });
            return;
        }

        // Generate JWT token
        const token = generateToken(user[0].id);
        conn.release();
        res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
})


export default router;