import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import routes from "./routes/routes.js";
dotenv.config();
const app = express();
app.use(express.json());
connectDB();

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.use("/api/notes", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("server is running on port" + " " + PORT);
});
