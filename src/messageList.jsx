import React, {Component} from "react";
import Message from "./message.jsx";
import Notification from "./message_system.jsx";
class MessageList extends Component {
  
    render() {
      
        const messageList = this.props.userMessage.map(eachMessage => (
            (eachMessage.type === "incomingMessage") ? 

              <Message key={eachMessage.id} id= {eachMessage.id} username={eachMessage.username} content={eachMessage.content}/>
            :
              <Notification key={eachMessage.id} id= {eachMessage.id} username={eachMessage.username} content={eachMessage.content}/>
          
        ))
      
      return (
        <main className="messages">
          {messageList}
        </main>
      );
    }
  }

  export default MessageList;