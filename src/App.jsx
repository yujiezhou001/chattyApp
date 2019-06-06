import React, {Component} from 'react';
import Nav from './nav.jsx';
import Chatbar from './chatbar.jsx';
import MessageList from './messageList.jsx';
import Message_system from './message_system.jsx';

// Main class which serves as the front-end server
class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [], // messages coming from the server will be stored here as they arrive
      numberOfUsers: ""
    };
    this.socket = new WebSocket('ws://localhost:3001')
  }

  // This function takes message input from textbar and send it to backend server
  // as a message object which has a sending type
  addMessage = (newMessage) => {
    const newMessageObject ={
      id: this.state.messages.length + 1,
      username:this.state.currentUser.name,
      content:newMessage,
      type: "postMessage"
    }
    this.socket.send(JSON.stringify(newMessageObject))
  }


  // This function takes name input from textbar and set it to backend server
  // as another message object which has a sending type

  changeUserName = (newUserName) => {
    const newUserNameObj = {
      username: newUserName,
      type: "postNotification",
      content:`User ${this.state.currentUser.name} changes name to ${newUserName}`
    }
    this.socket.send(JSON.stringify(newUserNameObj))
    this.setState({
      currentUser: {name: newUserName}
      });
  }

  // This function is the message handle function that handles incoming feedback
  // from the backend server depending on the type assigned in the backend server
  handleOnMessage = evt => {
    const incomingMessage = JSON.parse(evt.data);
    switch(incomingMessage.type){
      case "incomingMessage": 
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, incomingMessage];
        this.setState({
        messages: newMessages,
        });
        break;
      case "incomingNotification":
        const oldMessage = this.state.messages;
        const newMessage = [...oldMessage, incomingMessage];
        this.setState({
        messages: newMessage,
        })
        break;
      case "number":
        this.setState({
          numberOfUsers: incomingMessage
        })
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
  }
  
  // Connect the backend server after everything is loaded
  componentDidMount() {

      this.socket.onopen = function () {
      console.log("Connected to server");
       };

      this.socket.onmessage = this.handleOnMessage;


    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  // Render each component to the page
  render() {
    return (
      <div>
        <Nav numberOfUsers={this.state.numberOfUsers}/>
        <MessageList userMessage={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} addMessage={this.addMessage} changeUserName={this.changeUserName}/>
        <Message_system />
      </div>
    );
  }
}
export default App;
