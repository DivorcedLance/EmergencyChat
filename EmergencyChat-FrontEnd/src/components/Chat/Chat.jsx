import { useState, useRef, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import {
  MessageList,
  Button,
  Input,
  Navbar,
  SystemMessage,
} from "react-chat-elements";
import { useParams } from "react-router-dom";
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
  const [messages, setMessages] = useState([]);

  const addMessage = () => {
    //Se modifica title con el nombre del usuario logueado
    if (inputReferance.current.value === "") return;
    ws.current.send(
      JSON.stringify({
        event: "message",
        room: room,
        sesion: sesion,
        message: message,
      })
    );

    inputReferance.current.value = "";
  };

  const buttonSend = () => {
    return (
      <>
        <Button text={"Send"} onClick={addMessage} title="Send" />
      </>
    );
  };

  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }
    ws.current = new WebSocket(`ws://localhost:8000/ws/${room}`);

    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          event: "connection",
          room: room,
          sesion: sesion,
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.event === "message") {
        const newMessage = {
          position:
            data.username === sesion.usuario.username ? "right" : "left",
          type: "text",
          title: data.username,
          text: data.message,
          date: new Date(),
          room: data.room,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (data.event === "connection") {
        const newMessage = {
          type: "system",
          text: `${data.username} se ha unido a la sala ${sesion.device.district.name}`,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (data.event === "disconnection") {
        const newMessage = {
          type: "system",
          text: `${data.username} ha abandonado la sala ${sesion.device.district.name}`,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }

    };
    return () => {
      ws.current.close();
    };
  }, [room, sesion.usuario.id]);

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
