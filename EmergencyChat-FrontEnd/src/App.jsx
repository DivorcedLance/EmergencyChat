import { useState, useRef } from "react";
import "./App.css";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";

function App() {
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
  ]);

  const addMessage = () => {
    //Se modifica title con el nombre del usuario logueado
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
  };

  const buttonSend = () => {
    return <Button text={"Send"} onClick={addMessage} title="Send" />;
  };

  return (
    <>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={messages}
      />
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
    </>
  );
}

export default App;
