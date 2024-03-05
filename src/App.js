import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeaderLayout from "./pages/HeaderLayout";
import MapPage from "./pages/Mainpage/MapPage";
import Chatpage from "./pages/Chatting/ChatPage";
import MyPage from "./pages/Mypage/MyPage";
import EditPage from "./pages/Mypage/EditPage";
import FavoritesPage from "./pages/Mypage/FavoritesPage";
import CalendarPage from "./pages/Mypage/CalendarPage";
import LoginPage from "./components/Login/LoginPage";
import LoginAdd from "./components/Login/LoginAdd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    children: [
      { index: true, element: <MapPage /> },

      { path: "chat", element: <Chatpage /> },
      { path: "mypage", element: <MyPage /> },
      { path: "edit", element: <EditPage /> },
      { path: "favorite", element: <FavoritesPage /> },
      { path: "calendar", element: <CalendarPage /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "loginAdd", element: <LoginAdd /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
