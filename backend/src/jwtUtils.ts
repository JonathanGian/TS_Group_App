import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

interface AuthRequest extends Request {
    user?: any;
}
export const generateToken = (userId: number) =>{
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" }); // Expires in 1 hour
}

// Middleware to verify JWT Token
export const verifyToken = (req: any, res: any, next: any) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next(); // Continues to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ success: false, message : "Invalid or expired token"})
    }
}