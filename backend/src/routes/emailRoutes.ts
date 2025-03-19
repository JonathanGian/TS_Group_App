import express from "express";
import axios from "axios";
import pool from "../database";
import path from "path";
import fs from "fs/promises";
import multer from "multer";
import { verifyToken } from "../jwtUtils";

declare global {
  namespace Express {
    export interface Request {
      user?: { id: number };
    }
  }
}

const router = express.Router();

// You need to make an .env file with your API key!

const SNAPVALID_API_KEY = process.env.SNAPVALID_API_KEY; // name the variable in the .env file as SNAPVALID_API_KEY
if (!SNAPVALID_API_KEY) {
  throw new Error(
    "Missing SNAPVALID_API_KEY in environment variables! Check your .env file in backend folder.",
  );
}

const SNAPVALID_RESULTS_URL = "https://app.snapvalid.com/api/v1/verify";

// Configure multer to store uploaded files in a temporary folder:
const upload = multer({ dest: "uploads/" });

/**
 * POST /upload-emails
 * Accepts either a single email (via req.body.email) or a file upload (req.file) with a .txt or .csv file.
 * For .txt files, each line is expected to to be an email.
 * For .csv files, emails are expected to be comm and/or newline seperated.
 */
router.post(
  "/upload-emails",
  verifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      let emails: string[] = [];

      if (req.file) {
        // Read and process the uploaded file
        // Read and process the uploaded file
        const filePath = req.file.path;
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        const fileData = await fs.readFile(filePath, "utf-8");
        console.log("Raw file data:", fileData);

        // Remove the temporary file after reading its contents
        await fs.unlink(filePath);

        if (fileExtension === ".txt") {
          // Each line in a .txt file is assumed to be an email
          emails = fileData
            .split(/\r?\n/)
            .map((email) => email.trim())
            .filter((email) => email);
        } else if (fileExtension === ".csv") {
          // For .csv files, split by comma or newline to get the email addresses
          const cleanedData = fileData.replace(/["']/g, "");
          emails = cleanedData
            .split(/[\r\n,]+/)
            .map((email) => email.trim())
            .filter((email) => email);
        } else {
          res.status(400).json({
            success: false,
            message:
              "Unsupported file type. Please upload a .txt or .csv file.",
          });
          return;
        }
      } else if (req.body.email) {
        // Process a single email provided in the request body
        emails.push(req.body.email.trim());
      } else {
        res
          .status(400)
          .json({ success: false, message: "No file or email provided." });
        return;
      }
      console.log(emails);
      if (emails.length === 0) {
        res
          .status(400)
          .json({ success: false, message: "No valid email addresses found." });
        return;
      }

      // Assume req.user is set by verifyToken middleware
      const userId = req.user?.id || null;

      const conn = await pool.getConnection();
      // Create a new batch record.
      const batchResult: any = await conn.query(
        "INSERT INTO email_batches (user_id, created_at) VALUES (?, NOW())",
        [userId],
      );
      const batchId = batchResult.insertId;
      // Update file_uploads_id to equal the batchId.
      await conn.query(
        "UPDATE email_batches SET file_uploads_id = ? WHERE id = ?",
        [batchId, batchId],
      );

      // Insert each email into the emails table with the generated batch ID
      for (const email of emails) {
        await conn.query(
          "INSERT INTO emails (batch_id, email, status) VALUES (?, ?, 'pending')",
          [batchId, email],
        );
      }
      conn.release();

      res.json({
        success: true,
        message: `Uploaded and queued ${emails.length} email(s) for verification. Batch ID: ${batchId}`,
      });
    } catch (error: any) {
      console.error("Error processing uploaded emails:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process uploaded emails.",
        error: error.message,
      });
    }
  },
);

// DELETE /emails/:emailID

router.delete("/:emailId", verifyToken, async (req, res) => {
  try {
    const emailId = parseInt(req.params.emailId, 10);
    if (isNaN(emailId)) {
      res.status(400).json({ success: false, message: "Invalid email ID." });
      return;
    }

    const conn = await pool.getConnection();
    // Delete the email with the specified ID
    await conn.query("DELETE FROM emails WHERE id = ?", [emailId]);
    conn.release();

    res.json({
      success: true,
      message: `Email with ID ${emailId} has been deleted.`,
    });
  } catch (error: any) {
    console.error("Error deleting email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete email",
      error: error.message,
    });
  }
});

// DELETE /emails/batch/:batchID

router.delete("/batch/:batchID", verifyToken, async (req, res) => {
  try {
    const batchId = parseInt(req.params.batchID, 10);
    if (isNaN(batchId)) {
      res.status(400).json({ success: false, message: "Invalid batch ID." });
      return;
    }

    const conn = await pool.getConnection();
    // Delete emails associated with the batch ID
    await conn.query("DELETE FROM emails WHERE batch_id = ?", [batchId]);
    // Delete the batch record itself
    await conn.query("DELETE FROM email_batches WHERE id = ?", [batchId]);
    conn.release();

    res.json({
      success: true,
      message: `Batch ${batchId} and its emails have been deleted.`,
    });
  } catch (error: any) {
    console.error("Error deleting batch:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete batch",
      error: error.message,
    });
  }
});

// GET /emails

router.get("/status", verifyToken, async (req, res): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ success: false, message: "User not authenticated." });
      return;
    }

    const conn = await pool.getConnection();
    const query = `
        SELECT 
          e.id,
          e.batch_id,
          e.email,
          e.status,
          e.accept_all,
          e.role,
          e.free_email,
          e.disposable,
          e.spamtrap,
          e.result,
          e.message,
          eb.created_at as batch_created_at
        FROM emails e
        JOIN email_batches eb ON e.batch_id = eb.id
        WHERE eb.user_id = ?
        ORDER BY eb.created_at DESC, e.id DESC
      `;
    const emails = await conn.query(query, [userId]);
    conn.release();

    res.json({ success: true, emails });
  } catch (error: any) {
    console.error("Error fetching emails:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emails",
      error: error.message,
    });
  }
});

// GET SNAPVALID single validation
router.get("/verify-email", verifyToken, async (req, res) => {
  const { email } = req.query;
  if (!email) {
    res.status(400).json({ success: false, message: "Email is required" });
    return;
  }
  try {
    const response = await axios.get(
      `${SNAPVALID_RESULTS_URL}?apikey=${SNAPVALID_API_KEY}&email=${encodeURIComponent(
        email as string,
      )}`,
    );
    res.json(response.data);
    return 
  } catch (error: any) {
    console.error("Error verifying email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify email",
      error: error.message,
    });
    
  }
});

// FETCH RESULTS OF PENDING EMAILS/ VERIFY EMAILS FROM TABLE
router.get("/fetch-results", verifyToken, async (req, res) => {
  try {
    console.log("Fetching pending emails...");

    const conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT email FROM emails WHERE status = 'pending'",
    );
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

      const url = `${SNAPVALID_RESULTS_URL}?apikey=${SNAPVALID_API_KEY}&email=${encodeURIComponent(
        email,
      )}`;

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
        if (data.success === false) {
          console.warn(
            `SnapValid replied with success=false for ${email}: ${message}`,
          );
          await conn.query(
            "UPDATE emails SET result = ?, message = ?, accept_all = ?, role = ?, free_email = ?, disposable = ?, spamtrap = ?, status = 'verified' WHERE email = ?",
            [
              result,
              message,
              acceptAll,
              role,
              freeEmail,
              disposable,
              spamtrap,
              email,
            ],
          );
          continue; // Skip updating other fields
        }
        if (!data.success) {
          console.warn(`SnapValid could not validate ${email}: ${message}`);
          await conn.query(
            "UPDATE emails SET result = ?, message = ?, accept_all = 0, role = 0, free_email = 0, disposable = 0, spamtrap = 0, status = 'error' WHERE email = ?",
            [result, message, email],
          );
          continue; // Skip updating other fields
        }

        await conn.query(
          "UPDATE emails SET result = ?, message = ?, accept_all = ?, role = ?, free_email = ?, disposable = ?, spamtrap = ?, status = 'verified' WHERE email = ?",
          [
            result,
            message,
            acceptAll,
            role,
            freeEmail,
            disposable,
            spamtrap,
            email,
          ],
        );

        console.log(`Updated database for: ${email}`);
      } catch (error: any) {
        console.error(
          `Error verifying ${email}:`,
          error.response?.data || error.message,
        );
        await conn.query(
          "UPDATE emails SET status = 'error', message = ? WHERE email = ?",
          [error.message, email],
        );
      }
    }

    conn.release();
    res.json({
      success: true,
      message: "All pending emails have been processed",
    });
  } catch (error: any) {
    console.error("Error fetching results:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch validation results",
      error: error.message,
    });
  }
});

export default router;
