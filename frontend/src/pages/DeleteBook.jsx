import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import BackButton from "./../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`).then(() => {
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl">Удалить книгу</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-x-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3>Уверены что хотите удалить?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDelete}
        >
          Да
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
