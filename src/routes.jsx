import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddBook from "./pages/Book/AddBook";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home />,
  },
  {   
      path: "/addbook",
      element: <AddBook />,
  },
]);

export default router;