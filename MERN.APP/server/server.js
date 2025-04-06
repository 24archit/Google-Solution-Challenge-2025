require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const admin = require("./firebaseAdmin"); // Import Firebase Admin from firebaseAdmin.js

const app = express();
app.use(cors({
  origin: 'https://voter-guard.vercel.app',
  credentials: true,
}));
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key"; // Store securely

// Login route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Generate JWT token
    const jwtToken = jwt.sign({ uid }, SECRET_KEY, { expiresIn: "7d" });

    res.json({ jwt: jwtToken });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(7000, () => console.log("Server running on port 7000"));
