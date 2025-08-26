import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import routes from "./routes/routes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// middleware
app.use(express.json());
app.use(rateLimiter);

// port configuration
const PORT = process.env.PORT || 8000;
console.log(PORT);

// routes
app.use("/api/notes", routes);

// test route
app.get("/", (_, res) => {
  res.send("Hello World!");
});

// database connection
connectDB().then(() => {
  // start server
  app.listen(PORT, () => {
    console.log("server is running on port" + " " + `http://localhost:${PORT}`);
  });
});
