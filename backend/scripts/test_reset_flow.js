import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import { sendPasswordResetEmail } from '../services/emailService.js';
import { randomBytes } from 'node:crypto';

const emails = ['nguyenvanthienkf3232@gmail.com', 'nhomgpt4@gmail.com'];

async function run() {
    console.log("--> Starting Test Script V2...");

    console.log("--- Environment Variables Check ---");
    const frontendUrl = process.env.FRONTEND_URL;
    console.log(`FRONTEND_URL: ${frontendUrl}`);
    if (!frontendUrl) {
        console.warn("WARNING: FRONTEND_URL is not set in .env. Defaulting to fallback if logic allows, but this matches user request to check.");
    }
    console.log(`MONGO_URI: ${process.env.MONGO_URI ? "Found (Hidden)" : "MISSING"}`);
    console.log(`MAIL_SENDER_EMAIL: ${process.env.MAIL_SENDER_EMAIL}`);
    console.log("-----------------------------------");

    // Connect DB
    if (process.env.MONGO_URI) {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("--> Connected to MongoDB.");
        } catch (e) {
            console.error("--> MongoDB Connection failed:", e.message);
        }
    }

    for (const email of emails) {
        console.log(`\n========================================`);
        console.log(`Processing: ${email}`);

        let userExists = false;
        if (mongoose.connection.readyState === 1) {
            try {
                const user = await User.findOne({ email });
                if (user) {
                    console.log(`[DB] User found: ${user._id} - Role: ${user.role}`);
                    userExists = true;
                } else {
                    console.log(`[DB] User NOT found in database.`);
                }
            } catch (err) {
                console.log("[DB] Error finding user:", err.message);
            }
        }

        // Logic mimic authController
        const resetToken = randomBytes(32).toString("hex");

        // STRICTLY use env var or undefined (to see what happens if missing)
        // If missing, this will likely fail or produce "undefined/reset-password"
        const clientUrl = frontendUrl || "http://localhost:3000";

        const resetUrl = `${clientUrl.replace(/\/$/, "")}/reset-password?token=${resetToken}`;

        console.log(`[Email] Link to be sent: ${resetUrl}`);

        try {
            console.log(`[Email] Sending...`);
            const info = await sendPasswordResetEmail(email, resetUrl);
            console.log(`[Email] SUCCESS.`);
            console.log(`[Email] MessageID: ${info.messageId}`);
            console.log(`[Email] Response: ${info.response}`);
        } catch (err) {
            console.error(`[Email] FAILED to send to ${email}`);
            console.error("Full Error Log:", err);
        }
        console.log(`========================================`);
    }

    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }
}

run();
