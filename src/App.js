import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HeaderLayout from "./pages/HeaderLayout";
import Chatpage from "./pages/Chatting/ChatPage";
import MyPage from "./pages/Mypage/MyPage";
import EditPage from "./pages/Mypage/EditPage";
import FavoritesPage from "./pages/Mypage/FavoritesPage";
import CalendarPage from "./pages/Mypage/CalendarPage";
import LoginPage from "./components/Login/LoginPage";
import LoginAdd from "./components/Login/LoginAdd";
import FoundId from "./components/Login/FoundId";
import FoundPassword from "./components/Login/FoundPassword";
import ChangePassword from "./components/Login/ChangePassword";
import Redirection from "./components/Login/Redirection";
import MainPage from "./pages/Mainpage/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/" replace={true} />,
  },
  {
    path: "/",
    element: <HeaderLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "chat", element: <Chatpage /> },
      { path: "mypage", element: <MyPage /> },
      { path: "edit", element: <EditPage /> },
      { path: "favorite", element: <FavoritesPage /> },
      { path: "calendar", element: <CalendarPage /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "loginAdd", element: <LoginAdd /> },
  { path: "foundId", element: <FoundId /> },
  { path: "foundPassword", element: <FoundPassword /> },
  { path: "changePassword", element: <ChangePassword /> },
  { path: "/kakao/callback", element: <Redirection /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
