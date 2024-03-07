import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LoginSign from "./components/LoginSign.jsx";
import Chat from "./components/Chat/Chat.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Chat /> 
    {/* <LoginSign /> */}
  </React.StrictMode>
);
