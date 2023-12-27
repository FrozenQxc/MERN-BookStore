import express from "express";
import mongoose from "mongoose";
import BookRouter from "./routes/BookRouter.js";
import { PORT } from "./config.js";
import { mongoDB } from "./config.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("здарова");
});

app.use("/books", BookRouter);

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started. Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
