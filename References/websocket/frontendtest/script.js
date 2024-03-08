const room = "room1";
const client_id = "client1";
const ws = new WebSocket(`ws://localhost:8000/ws/${room}/${client_id}`);

ws.onmessage = function(event) {
    const messages = document.getElementById("messages");
    const message = document.createElement("div");
    message.textContent = event.data;
    messages.appendChild(message);
};

document.getElementById("send-button").onclick = function() {
    const input = document.getElementById("message-input");
    const message = input.value;
    ws.send(message);
    input.value = "";
};
