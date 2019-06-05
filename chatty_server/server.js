// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
//need a unique id here, source of truth

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    const messageObj = JSON.parse(message);
    const id = uuidv4();
    messageObj.id = id;

    console.log(`User ${messageObj.username} said ${messageObj.content}`);
    switch (messageObj.type) {
      case "postMessage":
      messageObj.type = "incomingMessage"
      console.log(messageObj)
      wss.clients.forEach(function each(client) {
        // if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageObj));
        // }
      });
      break;
      case "postNotification":
      // messageObj.type = "incomingNotification"
      wss.clients.forEach(function each(client) {
        // if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageObj));
        // }
      });

    }
    // uniqueId = uuidv4();
    
    // ws.send(JSON.stringify(newMessageObj));
  });

  
  // ws.send("somthing");//needs to be in 24 to 26

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});