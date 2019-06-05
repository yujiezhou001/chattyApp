import React, {Component} from "react";
class Chatbar extends Component {
  

  constructor(props){
    super(props)
    this.state = {
    // _id: Math.random().toString(36).substring(7),
    // username:this.props.currentUser.name,
    content:'',
    username:''
    }
  }


  handleChangeName = event => {
    this.setState({username:event.target.value})
  }

  handleKeyDownName = event => {

    if (event.key === "Enter"){
      // event.preventDefault()
      console.log("this.state.username");
      this.props.changeUserName(this.state.username);
      event.target.value ='';
      this.setState({username: ''})
    }
  }

  handleChange = event => {
    this.setState({content:event.target.value})
  }

  handleKeyDown = event => {

    if (event.key === "Enter"){
      // event.preventDefault()
      // console.log("this.state.content")
      this.props.addMessage(this.state.content);
      event.target.value ='';
      this.setState({content: ''})
    }
  }
    render() {
      return (
       <footer className="chatbar">
            <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onChange={this.handleChangeName} onKeyDown={this.handleKeyDownName}/>
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
        </footer>
      );
    }
  }

  export default Chatbar;