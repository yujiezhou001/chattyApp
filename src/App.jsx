import React, {Component} from 'react';
import Nav from './nav.jsx';
import Chatbar from './chatbar.jsx';
import Message from './message.jsx';
import Message_system from './message_system.jsx';
// import ws from '../chatty_server/server';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages:[{
        id: "1",
        username: "Anonymous",
        content: "Has anyone seen my marbles?"
      },{
        id: "2",
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }]
    };
    this.socket = new WebSocket('ws://localhost:3001')
  }

  addMessage = (newMessage) => {
    const newMessageObject ={
      id: this.state.messages.length + 1,
      username:this.state.currentUser.name,
      content:newMessage
    }
    this.socket.send(JSON.stringify(newMessageObject))
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessageObject];
    this.setState({
      messages: newMessages
    });
  }

  componentDidMount() {

      this.socket.onopen = function () {
      console.log("Connected to server");
    };

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
        <Nav />
        <Message userMessage={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
        <Message_system />
      </div>
    );
  }
}
export default App;
