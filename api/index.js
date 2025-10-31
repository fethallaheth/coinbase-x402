import express from "express";
import { paymentMiddleware } from "x402-express";
import dotenv from "dotenv";
import path from "path";
import { videoAccessHandler } from "../handlers/videoAccessHandler.js";
import { recordTransaction, getStats } from "../utils/stats.js";

dotenv.config();

// Create and configure the Express app
const app = express();

// Use Base Sepolia (testnet) for development
const network = "base-sepolia";
const facilitatorObj = { url: "https://facilitator.payai.network" };

// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json());

// x402 payment middleware configuration
app.use(
  paymentMiddleware(
    process.env.WALLET_ADDRESS,
    {
      // Protected endpoint for authentication
      "GET /authenticate": {
        price: "$0.10", // Set your desired price
        network: network,
      },
      // Protected endpoint for video content - SAME PAYMENT REQUIRED
      "GET /video-content": {
        price: "$0.10", // Must match authenticate price
        network: network,
      },
    },
    facilitatorObj
  )
);

// Authentication endpoint - records transaction and redirects
app.get("/authenticate", (req, res) => {
  // Record the successful payment
  recordTransaction("$0.10", req.headers['x-wallet-address'] || 'anonymous');
  res.redirect("/video-content");
});

// Video content endpoint - serves the authenticated content
app.get("/video-content", videoAccessHandler);

// API endpoint for real-time stats
app.get("/api/stats", (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Serve the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Export the app for Vercel serverless functions
export default app;

// Start the server for local development
const PORT = process.env.PORT || 4021;
app.listen(PORT);