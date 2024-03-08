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
    ws.current = new WebSocket(`ws://localhost:8000/ws/${room}/${clientID}`);
    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    return () => {
      ws.current.close();
    };
  }, [room, clientID]);

  const sendMessage = () => {
    if (message !== '') {
      ws.current.send(message);
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
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default ChatApp;
