// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./database";
import authRoutes from "./routes/authRoutes";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());
// Authentication Routes
app.use("/api/auth", authRoutes)


// Test Route
app.get("/", (req, res) => {
    res.send("Server is running");
})
// Email Verification Routes
app.use("/api/emails", emailRoutes)

// Database Connection Test Route
app.get("/test-db", async (req, res) => {
    
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as test");
        conn.release();
        res.json({ success: true, message: "Database connected!",data: rows });   
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ success: false, message: "Database connection failed!" , error});
        
    }
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})