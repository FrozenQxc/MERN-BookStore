import express from "express";
import mongoose from "mongoose";

import { PORT } from "./config.js";
import { mongoDB } from "./config.js";
import { Book } from "./models/bookModels.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("здарова");
});

//* Вывести все книги
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//* Получить одну книгу по id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//* Обновить книгу
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Нет данных: тайтл, автор, дата",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({
        message: "Книга не найдена",
      });
    }

    return res.status(200).send({ message: "Книга обновилась" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Произошла ошибка при обновлении книги",
    });
  }
});

//* Добавление книги методом post
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Нет данных: тайтл, автор, дата",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
  }
});

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
