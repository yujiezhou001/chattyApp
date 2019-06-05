import React, {Component} from "react";
class Message_system extends Component {
    render() {
      return (
        <div className="message system">
        {this.props.content}
        </div>
      );
    }
  }

  export default Message_system;