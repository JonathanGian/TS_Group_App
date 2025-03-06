import express from "express";
import axios from "axios";
import pool from "../database";
import { verifyToken } from "../jwtUtils";
import e from "express";

const router = express.Router();

const SNAPVALID_API_KEY = process.env.SNAPVALID_API_KEY;
const SNAPVALID_RESULTS_URL = "https://app.snapvalid.com/api/v1/verify";

router.get("/fetch-results", verifyToken, async (req, res) => {
    try {
        console.log("Fetching pending emails...");

        const conn = await pool.getConnection();
        const result = await conn.query("SELECT email FROM emails WHERE status = 'pending'");
        const pendingEmails = Array.isArray(result) ? result : [];

        console.log(`Found ${pendingEmails.length} pending emails`);

        if (pendingEmails.length === 0) {
            conn.release();
            res.json({ success: false, message: "No pending emails to verify" });
            return;
        }

        for (const row of pendingEmails) {
            const email = row.email;
            console.log(`Verifying email: ${email}`);

            const url = `${SNAPVALID_RESULTS_URL}?apikey=${SNAPVALID_API_KEY}&email=${encodeURIComponent(email)}`;

            try {
                const response = await axios.get(url);
                console.log(`Response for ${email}:`, response.data);
                const data = response.data;

                const result = data.result || "unknown";
                const message = data.message || "No message provided";
                const acceptAll = Boolean(data.accept_all);
                const role = Boolean(data.role);
                const freeEmail = Boolean(data.free_email);
                const disposable = Boolean(data.disposable);
                const spamtrap = Boolean(data.spamtrap);

                if (!data.success) {
                    console.warn(`SnapValid could not validate ${email}: ${message}`);
                    await conn.query(
                        "UPDATE emails SET result = ?, message = ?, status = 'error' WHERE email = ?",
                        [result, message, email]
                    );
                    continue; // Skip updating other fields
                }

                await conn.query(
                    "UPDATE emails SET result = ?, message = ?, accept_all = ?, role = ?, free_email = ?, disposable = ?, spamtrap = ?, status = 'verified' WHERE email = ?",
                    [result, message, acceptAll, role, freeEmail, disposable, spamtrap, email]
                );

                console.log(`Updated database for: ${email}`);

            } catch (error: any) {
                console.error(`Error verifying ${email}:`, error.response?.data || error.message);
                await conn.query(
                    "UPDATE emails SET status = 'error', message = ? WHERE email = ?",
                    [error.message, email]
                );
            }
        }

        conn.release();
        res.json({ success: true, message: "All pending emails have been processed" });

    } catch (error: any) {
        console.error("Error fetching results:", error);
        res.status(500).json({ success: false, message: "Failed to fetch validation results", error: error.message });
    }
});

export default router;