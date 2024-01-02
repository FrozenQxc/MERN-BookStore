import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };

    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Книга создана", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Произошла ошибка", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-cyan-500 text-xl font-bold mb-4">Добавить книгу</h1>
        {loading ? <Spinner /> : ""}
        <form
          onSubmit={handleSaveBook}
          className="flex flex-col gap-2 w-[600px] mx-auto"
        >
          <input
            className="bg-slate-500 text-white px-2 py-1 rounded-md mx-auto text-center"
            type="text"
            placeholder="Название книги"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="bg-slate-500 text-white px-2 py-1 rounded-md mx-auto text-center"
            type="text"
            placeholder="Автор"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
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

export default CreateBook;
