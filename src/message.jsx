import React, {Component} from "react";
class Message extends Component {
  
    render() {
      
        const messageList = this.props.userMessage.map(eachMessage => (

           <div className="message" id={eachMessage.id} key={eachMessage.id}>
            <span className="message-username">{eachMessage.username}</span>
            <span className="message-content">{eachMessage.content}</span>
          </div>
          
        ))
      
      return (
        <div>
          {messageList}
        </div>
      );
    }
  }

  export default Message;