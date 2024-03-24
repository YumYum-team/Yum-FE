import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeaderLayout from "./pages/HeaderLayout";
import MapPage from "./pages/Mainpage/MapPage";
import Chatpage from "./pages/Chatting/ChatPage";
import MyPage from "./pages/Mypage/MyPage";
import LoginPage from "./components/Login/LoginPage";
import LoginAdd from "./components/Login/LoginAdd";
import FoundId from "./components/Login/FoundId";
import FoundPassword from "./components/Login/FoundPassword";
import ChangePassword from "./components/Login/ChangePassword";
import Email from "./components/Login/Email";
import Redirection from "./components/Login/Redirection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderLayout />,
    children: [
      { index: true, element: <MapPage /> },

      { path: "chat", element: <Chatpage /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "loginAdd", element: <LoginAdd /> },
  { path: "foundId", element: <FoundId /> },
  { path: "foundPassword", element: <FoundPassword /> },
  { path: "changePassword", element: <ChangePassword /> },
  { path: "email", element: <Email /> },
  { path: "/kakao/callback", element: <Redirection /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
