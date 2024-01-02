import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  return (
    <Link
      className="flex bg-sky-800 w-fit px-4 py-1 rounded-lg text-white items-center gap-2"
      to={"/"}
    >
      <BsArrowLeft />
      <h1>Вернуться назад</h1>
    </Link>
  );
};

export default BackButton;
