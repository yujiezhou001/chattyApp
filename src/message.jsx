//Create each message component

import React, {Component} from "react";
class Message extends Component {
  
    render() {
        return(
            <div className="message" id={this.props.id}>
            <span className="message-username">{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
            </div>
        )
    }
}
export default Message;