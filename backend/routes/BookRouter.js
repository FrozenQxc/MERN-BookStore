import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

//* Вывести все книги
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.put("//:id", async (req, res) => {
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

    return result.status(200).send({ message: "Книга удалилась" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Произошла ошибка при обновлении книги",
    });
  }
});

//* Добавление книги методом post
router.post("/", async (req, res) => {
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

//* Удаление книги методом delete
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({
        message: "Книга не найдена",
      });
    }

    return response.status(200).send({ message: "Книга удалилась" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: "Произошла ошибка при обновлении книги",
    });
  }
});

export default router;
