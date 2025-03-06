import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5030;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running");
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})