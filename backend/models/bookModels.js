import mongoose from "mongoose";

//* Схема для добавление книги
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publishYear: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Cat", bookSchema);