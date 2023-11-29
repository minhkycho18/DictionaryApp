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
import Manager from "../layouts/Manager/Manager";
import VocabularyManagement from "../pages/Manager/Vocabulary/VocabularyManagement";
import Leitner from "../pages/Learner/leitner/Leitner";
import WordListsPage from "../pages/Learner/wordlists/WordListsPage";
import WordListDetail from "../pages/Learner/wordlists/WordListDetail";
import ExploredWordList from "../pages/Learner/wordlists/ExploredWordList/ExploredWordList";
import Game from "../pages/Learner/game/Game";
import WordListManagement from "../pages/Manager/WordList/WordListManagement";
import ContributionVocabulary from "../pages/Manager/Contribution/ContributionVocabulary";
import { getLeiner } from "../api/Leitner/leitner.api";
import LeitnerLevel from "../pages/Learner/leitner/LeitnerLevel";
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
            children: [
              {
                path: "",
                element: <WordListDetail />,
              },
            ],
          },
          {
            path: "public",
            element: <ExploredWordList type={"public"} />,
          },
          {
            path: "default",
            element: <ExploredWordList type={"default"} />,
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
        children: [
          {
            path: "",
            element: <Leitner />,
          },
          {
            path: ":id",
            element: <LeitnerLevel />,
            loader: async ({ params }) => {
              try {
                const rs = await getLeiner();
                const id = params.id;
                const vocab = rs.filter(
                  (item) => item.levelName === decodeURI(id)
                );
                return { data: vocab[0], error: null };
              } catch (error) {
                return { data: [], error: "fail" };
              }
            },
          },
        ],
      },
    ],
  },
  {
    path: "/vocabulary/:wlId/detail/:subId/learn",
    children: [
      {
        index: true,
        element: <Game />,
      },
    ],
    // {
    //   path: "game/new",
    //   element: <NewGame />,
    // },
    // {
    //   path: "game/:id",
    //   element: <Game />,
    // },
    // {
    //   path: "explore",
    //   element: <ExploredWordList />,
    // },
    // {
    //   path: "my-words",
    //   element: <MyWords />,
    // },
    // {
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  {
    path: "/manager",
    element: <Manager />,
    children: [
      // {
      //   path: "account",
      //   element: <Profile />,
      // },
      {
        path: "vocabulary",
        element: <VocabularyManagement />,
      },
      {
        path: "wordlist",
        element: <WordListManagement />,
      },
      {
        path: "contribution",
        element: <ContributionVocabulary />,
      },
    ],
  },
]);

export default routers;
