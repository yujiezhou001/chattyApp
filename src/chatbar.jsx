// Create chatbar component

import React, {Component} from "react";
class Chatbar extends Component {
  
  constructor(props){
    super(props)
    this.state = {
    content:'',
    username:''
    }
  }

  // set local state username to newly inputed value
  handleChangeName = event => {
    this.setState({username:event.target.value})
  }

  // function that handles enter keydown action in username input
  // change username by calling the function in App and clears the state and input
  handleKeyDownName = event => {

    if (event.key === "Enter"){
      console.log("this.state.username");
      this.props.changeUserName(this.state.username);
      event.target.value ='';
      this.setState({username: ''})
    }
  }

  // set local state content to newly inputed value
  handleChange = event => {
    this.setState({content:event.target.value})
  }


  // function that handles enter keydown action in message input
  // change username by calling the function in App and clears the state and input
  handleKeyDown = event => {

    if (event.key === "Enter"){
      // event.preventDefault()
      // console.log("this.state.content")
      this.props.addMessage(this.state.content);
      event.target.value ='';
      this.setState({content: ''})
    }
  }

    // renders the chatbar component
    render() {
      return (
       <footer className="chatbar">
            <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue="" onChange={this.handleChangeName} onKeyDown={this.handleKeyDownName}/>
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
        </footer>
      );
    }
  }

  export default Chatbar;