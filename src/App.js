import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/login/LoginPage";
import LoginAdd from "./pages/login/LoginAdd";
import Chatpage from "./pages/chatting/ChatPage";
import MapPage from "./pages/mainpage/MapPage";
import MyPage from "./pages/mypage/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <MapPage /> },

      { path: "chat", element: <Chatpage /> },
      { path: "mypage", element: <MyPage /> },
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
