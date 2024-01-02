import { useEffect, useState } from "react";
import Spinner from "./../components/Spinner";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`).then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
      publishYear(res.data.publishYear);
      setLoading(false);
    });
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };

    axios.put(`http://localhost:5555/books/${id}`, data).then(() => {
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <div className="p-4">
      <BackButton />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-cyan-500 text-xl font-bold mb-4">Изменить книгу</h1>
        {loading ? <Spinner /> : ""}
        <form
          onSubmit={handleInput}
          className="flex flex-col gap-2 w-[600px] mx-auto"
        >
          <input
            value={title}
            className="bg-slate-500 text-white px-2 py-1 rounded-md mx-auto text-center"
            type="text"
            placeholder="Название книги"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            value={author}
            className="bg-slate-500 text-white px-2 py-1 rounded-md mx-auto text-center"
            type="text"
            placeholder="Автор"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            value={publishYear}
            className="bg-slate-500 text-white px-2 py-1 rounded-md mx-auto text-center"
            type="number"
            placeholder="Год издания"
            onChange={(e) => setPublishYear(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-500 text-white px-4 py-2 rounded-md mx-auto text-center"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
