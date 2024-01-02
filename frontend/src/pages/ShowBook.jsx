import { useEffect, useState } from "react";
import BackButton from "./../components/BackButton";
import axios from "axios";
import { useParams } from "react-router";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1>Show book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id:</span>
            <span className="text-xl mr-4 text-gray-500">{books._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Название:</span>
            <span className="text-xl mr-4 text-gray-500">{books.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Автор:</span>
            <span className="text-xl mr-4 text-gray-500">{books.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Дата выхода:</span>
            <span className="text-xl mr-4 text-gray-500">
              {books.publishYear}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Время создание:</span>
            <span className="text-xl mr-4 text-gray-500">
              {books.createdAt
                ? new Date(books.createdAt).toString()
                : "Нет даты"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
