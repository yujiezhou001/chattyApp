// server.js

const express = require('express');
const SocketServer = require('ws').Server;

//need a unique id here, source of truth
const uuidv4 = require('uuid/v4');

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
  const userNumberObj = {};
  userNumberObj.number = wss.clients.size;
  userNumberObj.type = "number";
  console.log(userNumberObj);

  //broadcast number of users object to each connected user
  wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(userNumberObj));
  });

  ws.on('message', function incoming(message) {
    const messageObj = JSON.parse(message);
    const id = uuidv4();
    messageObj.id = id;

    console.log(`User ${messageObj.username} said ${messageObj.content}`);
    switch (messageObj.type) {
      case "postMessage":
      messageObj.type = "incomingMessage"
      console.log(messageObj)

      //broadcast message object to each connected user
      wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(messageObj));
      });
      break;
      case "postNotification":
      messageObj.type = "incomingNotification"

      //broadcast notification message object to each connected user
      wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(messageObj));
      });

    };
  });

  

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    console.log("Client disconnected")
    userNumberObj.number = wss.clients.size

    //broadcast number of users to every connected user
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(userNumberObj));
    });

  })


});