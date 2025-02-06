import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

