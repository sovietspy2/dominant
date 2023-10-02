const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8888 });

// Store connected clients
const clients = new Set();

server.on('connection', (socket) => {
  // Add the new client to the set
  clients.add(socket);

  // Send a welcome message to the connected client
  //socket.send('Welcome to the chat!');

  // Broadcast a message to all connected clients
  function broadcast(message) {
    clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        console.log("Sending message")
        client.send(JSON.stringify(message));
      }
    });
  }

  // Handle incoming messages from clients
  socket.on('message', (message) => {

    const data = JSON.parse(message);

    // Broadcast the message to all other clients
    console.log("on:message: "+data.message)
    broadcast(data);
  });

  // Handle client disconnect
  socket.on('close', () => {
    // Remove the client from the set of connected clients
    clients.delete(socket);
  });
});

console.log('WebSocket chat server is running on port 8888');

//TODO: refactor file, add TOKEN auth so username can be read from there 