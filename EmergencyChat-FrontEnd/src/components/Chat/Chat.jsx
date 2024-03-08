import { useState, useRef, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList, Button, Input, Navbar } from "react-chat-elements";
import { useParams } from "react-router-dom";
import example from "./example.jpg";
import "./Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SendImage from "../ModalImg/SendImage";

function Chat({ logoutSesion, sesion }) {
  //EL ROOM LLEGA POR PROPS DEL INICIO
  const { room } = useParams();

  const scrollRef = useRef();
  const inputReferance = useRef(null);
  const ws = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
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
    ws.current.send(message);
    inputReferance.current.value = "";
    /* setMessages([...messages, newMessage]);
    
    scrollRef.current.scrollIntoView({ behavior: "smooth" }); */
  };

  const buttonSend = () => {
    return (
      <>
        <SendImage />
        <Button text={"Send"} onClick={addMessage} title="Send" />
      </>
    );
  };


  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }
    ws.current = new WebSocket(`ws://localhost:8000/ws/${room}/${sesion.usuario.id}`);
    ws.current.onmessage = (event) => {
      console.log(event);
      //VIENEN LOS IF
      const newMessage = {
        position: "right",
        type: "text",
        title: "Emre",
        text: event.data,
        date: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    return () => {
      ws.current.close();
    };
  }, [room, sesion.usuario.id]);


  const buttonSendImage = () => {
    return <SendImage />;
  };
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
