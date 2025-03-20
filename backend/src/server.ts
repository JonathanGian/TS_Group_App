import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})