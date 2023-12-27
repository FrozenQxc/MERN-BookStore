import express from "express";
import mongoose from "mongoose";
import BookRouter from "./routes/BookRouter.js";
import { PORT } from "./config.js";
import { mongoDB } from "./config.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("здарова");
});

app.use("/books", BookRouter);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("connect o mongoDB");
    app.listen(PORT, () => {
      console.log(`Сервер запушен. Порт : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
