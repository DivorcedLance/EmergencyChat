import { useState, useEffect, useRef } from 'react';

function ChatApp() {
  const [room, setRoom] = useState('room1');
  const [clientID, setClientID] = useState('client1');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }
    ws.current = new WebSocket(`ws://localhost:8000/ws/${room}`);

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
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      ws.current.close();
    };
  }, [room, clientID]);

  const sendMessage = () => {
    if (message !== '') {
      ws.current.send(JSON.stringify({
        event: 'message',
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
        message: message,
      }));
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <label>Room:</label>
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="room1">Room 1</option>
          <option value="room2">Room 2</option>
          <option value="room3">Room 3</option>
        </select>
      </div>
      <div>
        <label>User:</label>
        <input
          type="text"
          value={clientID}
          onChange={(e) => setClientID(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((msg, index) => {
          if (msg.event === 'connection') {
            return (<div key={index}>{msg.username} connected to {msg.room}</div>);
          } else if (msg.event === 'disconnection') {
            return (<div key={index}>{msg.username} disconnected from {msg.room}</div>);
          } else if (msg.event === 'message') {
            return (<div key={index}>{msg.username}: {msg.message}</div>)
          }
        })}
      </div>
    </div>
  );
}

export default ChatApp;