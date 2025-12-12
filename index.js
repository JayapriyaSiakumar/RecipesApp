import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import recipesRoute from "./Routers/recipesRoute.js";
import connectDB from "./Database/dbConfig.js";

//dotenv
dotenv.config();

//app config
const app = express();

// default middleware
app.use(express.json());
// middlewares
app.use("/api/recipes", recipesRoute);

app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.status(200).send('<h1 style="text-align-center;">Welcome to Backend<h1>');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on the port ${port}`);
});
