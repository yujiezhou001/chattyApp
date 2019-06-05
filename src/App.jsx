import React, {Component} from 'react';
import Nav from './nav.jsx';
import Chatbar from './chatbar.jsx';
import MessageList from './messageList.jsx';
import Message_system from './message_system.jsx';
// import ws from '../chatty_server/server';
class App extends Component {

  constructor(props){
    super(props);
    // this.state = {
    //   currentUser: {name: "Anonymous"},
    //   messages:[{
    //     id: "1",
    //     username: "Anonymous",
    //     content: "Has anyone seen my marbles?"
    //   },{
    //     id: "2",
    //     username: "Anonymous",
    //     content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    //   }]
    // };
    this.state = {
      currentUser: {name: ""},
      messages: [], // messages coming from the server will be stored here as they arrive
      numberOfUsers: ""
    };
    this.socket = new WebSocket('ws://localhost:3001')
  }

  addMessage = (newMessage) => {
    const newMessageObject ={
      id: this.state.messages.length + 1,
      username:this.state.currentUser.name,
      content:newMessage,
      type: "postMessage"
    }
    this.socket.send(JSON.stringify(newMessageObject))
    // const oldMessages = this.state.messages;
    // const newMessages = [...oldMessages, newMessageObject];
    // this.setState({
    //   messages: newMessages
    // });
  }

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


  handleOnMessage = evt => {
    const incomingMessage = JSON.parse(evt.data);
    switch(incomingMessage.type){
      case "incomingMessage": 
        console.log("data", incomingMessage);
        const oldMessages = this.state.messages;
        const newMessages = [...oldMessages, incomingMessage];
        this.setState({
        messages: newMessages,
        });
        break;
      case "postNotification":
        const oldMessage = this.state.messages;
        const newMessage = [...oldMessage, incomingMessage];
        this.setState({
        messages: newMessage,
        })
        break;
      case "number":
        console.log(incomingMessage)
        this.setState({
          numberOfUsers: incomingMessage
        })
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
  }
  

  componentDidMount() {

      this.socket.onopen = function () {
      console.log("Connected to server");
       };

      this.socket.onmessage = this.handleOnMessage;

      // this.socket.onmessage = function incoming(data) {
      // const parsedMessage = JSON.parse(event.data)
      // console.log("data", parsedMessage);
      //
      // const oldMessages = this.state.messages;
      // const newMessages = [...oldMessages, parsedMessage];
      // this.setState({
      //   messages: newMessages
      //  });


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
