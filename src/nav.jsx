// Create navbar component

import React, {Component} from "react";
class Nav extends Component {
    render() {
      const userNumber = this.props.numberOfUsers.number;
      return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <p className="navbar-user"> {userNumber} Users Online</p>
        </nav>
      );
    }
  }

  export default Nav;


