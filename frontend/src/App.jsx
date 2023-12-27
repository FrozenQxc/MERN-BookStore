import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create/:id" element={<CreateBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
}

export default App;
