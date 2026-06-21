import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";

const app = express();
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

// api routes

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`App is listing on port ${port}`);
});
