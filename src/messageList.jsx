//Create messageList component using Message component

import React, {Component} from "react";
import Message from "./message.jsx";
import Notification from "./message_system.jsx";
class MessageList extends Component {
  
    render() {
        //For each message object, decide whether to make them message component
        //or notification component  
        const messageList = this.props.userMessage.map(eachMessage => (
            (eachMessage.type === "incomingMessage") ? 

              <Message key={eachMessage.id} id= {eachMessage.id} username={eachMessage.username} content={eachMessage.content} color={eachMessage.color}/>
            :
              <Notification key={eachMessage.id} id= {eachMessage.id} username={eachMessage.username} content={eachMessage.content} color={eachMessage.color}/>
          
        ))
      
      return (
        <main className="messages">
          {messageList}
        </main>
      );
    }
  }

  export default MessageList;