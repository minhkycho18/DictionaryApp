import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Learner/home/Home";
import Dictionary from "../pages/Learner/dictionary/Dictionary";
import HomePage from "../layouts/HomePage/HomePage";
import Vocabulary from "../pages/Learner/vocabulary/Vocabulary";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Profile from "../pages/Learner/profile/Profile";
import MyWordLists from "../pages/Learner/my-word-lists/MyWordLists";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";
import Auth from "../layouts/Auth/Auth";
import Leitner from "../pages/Learner/leitner/Leitner";
import WordListsPage from "../pages/Learner/wordlists/WordListsPage";
import WordListDetail from "../pages/Learner/wordlists/WordListDetail";
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
        children: [
          {
            path: "",
            element: <Vocabulary />,
          },

          {
            path: "detail",
            element: <WordListDetail />,
          },
        ],
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
        children: [
          {
            path: "",
            element: <MyWordLists />,
          },
          {
            path: ":name/:id",
            element: <WordListsPage />,
          },
        ],
      },
      {
        path: "leitner",
        element: <Leitner />,
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
