import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Dictionary from "../pages/dictionary/Dictionary";
import HomePage from "../layouts/HomePage/HomePage";
import Vocabulary from "../pages/vocabulary/Vocabulary";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import MyWordLists from "../pages/my-word-lists/MyWordLists";
import SignIn from "../pages/sign-in/SignIn";
import Register from "../pages/sign-up/SignUp";
import SignUp from "../pages/sign-up/SignUp";
import Auth from "../layouts/Auth/Auth";
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
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
]);

export default routers;
