import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Dictionary from "../pages/dictionary/Dictionary";
import HomePage from "../layouts/HomePage/HomePage";
import Vocabulary from "../pages/vocabulary/Vocabulary";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import MyWordLists from "../pages/my-word-lists/MyWordLists";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "dictionary",
        element: <Dictionary />,
      },
      {
        path: "",
        element: <Home />,
      },
      {
        path: "vocabulary",
        element: <Vocabulary />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "wordLists",
        element: <MyWordLists />,
      },
      {
        path: "leitner",
      },
    ],
  },
]);

export default routers;
