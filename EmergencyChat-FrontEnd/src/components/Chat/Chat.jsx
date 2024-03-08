import { useState, useRef, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList, Button, Input, Navbar, SystemMessage } from "react-chat-elements";
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
    ws.current.send(JSON.stringify({
      event: 'connection',
      room: room,
      session: {
        client: {
          client_id: sesion.usuario.id,
          username: sesion.usuario.username,
          logueado: true,
        },
        device: {
          device_id: "",
          deviceToken: sesion.device.deviceToken,
          district: sesion.device.district.name,
          district_id: sesion.device.district.id,
          location: {
            longitude: sesion.device.location.longitude,
            latitude: sesion.device.location.latitude,
          },
        }
      },
      message: message,
    }));

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
    
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({
        event: 'connection',
        room: room,
        session: {
          client: {
            client_id: clientID,
            username: clientID,
            logueado: false,
          },
          device: {
            device_id: "",
            deviceToken: "",
            district: "",
            district_id: room,
            location: {
              longitude: 0.0,
              latitude: 0.0,
            },
          }
        },
      }));
    }


    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      
      if(data.event === "message"){
        const newMessage = {
          position: data.client === sesion.usuario.id ? "right" : "left",
          type: "text",
          title: data.client,
          text: data.message,
          date: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if(data.event === "connection"){
        const newMessage = {
          type: "system",
          text: data.message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        /* document.getElementsByClassName("rce-mlist").appendChild(
          <SystemMessage
            text={data.message}
          />
        ); */
        
      }

      //VIENEN LOS IF
      /* const newMessage = {
        position: "right",
        type: "text",
        title: "Emre",
        text: event.data,
        date: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]); */
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
