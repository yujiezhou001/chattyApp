// Create navbar component

import React, {Component} from "react";
class Nav extends Component {
    render() {
      return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <p className="navbar-user"> {this.props.numberOfUsers.number} Users Online</p>
        </nav>
      );
    }
  }

  export default Nav;


