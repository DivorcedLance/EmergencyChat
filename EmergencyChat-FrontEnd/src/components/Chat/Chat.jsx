import { useState, useRef, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList, Button, Input, Navbar } from "react-chat-elements";
import { useParams } from "react-router-dom";
import example from "./example.jpg";
import "./Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Chat({ logoutSesion, sesion }) {
  //EL ROOM LLEGA POR PROPS DEL INICIO
  const { room } = useParams();

  const scrollRef = useRef();

  const inputReferance = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    //INFORMACION OBTENIDA DEL BACKEND
    //POSITION SE DECIDE SEGUN EL USUARIO
    //SI ES EL USUARIO LOGUEADO, right, otro caso left
    {
      position: "left",
      type: "text",
      title: "Kursat",
      text: "Give me a message list example !",
      date: new Date(),
    },
    {
      position: "right",
      type: "text",
      title: "Emre",
      text: "That's all.",
      date: new Date(),
    },
    {
      position: "left",
      type: "photo",
      title: "Kursat",
      data: { uri: "https://picsum.photos/200/200", with: 200, height: 200 },
      date: new Date(),
    },
  ]);

  const addMessage = () => {
    //Se modifica title con el nombre del usuario logueado
    if (inputReferance.current.value === "") return;
    const newMessage = {
      position: "right",
      type: "text",
      title: "Emre",
      text: message,
      date: new Date(),
    };
    setMessage("");
    setMessages([...messages, newMessage]);
    inputReferance.current.value = "";
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const buttonSend = () => {
    return <Button text={"Send"} onClick={addMessage} title="Send" />;
  };

  const buttonSendImage = () => {
    return (
      <Button
        text={"Images"}
        onClick={() => {
          
        }}
        title="Send"
      />
    );
  }
  const buttonLogOut = () => {
    return (
      <Button
        text={"Log Out"}
        onClick={() => {
          logoutSesion();
          window.location.href = "/";
        }}
        title="Log Out"
      />
    );
  };

  return (
    <div className="Chat-contaniner">
      <Navbar
        left={<div>{sesion.usuario.username}</div>}
        center={<div>{room}</div>}
        right={buttonLogOut()}
      />
      <MessageList lockable={true} toBottomHeight={10} dataSource={messages} />
      <div className="fantasma" ref={scrollRef}></div>
      <Input
        referance={inputReferance}
        placeholder="Type here..."
        multiline={true}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        rightButtons={buttonSend()}
      />
    </div>
  );
}

export default Chat;
