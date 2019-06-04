import React, {Component} from 'react';
import Nav from './nav.jsx';
import Chatbar from './chatbar.jsx';
import Message from './message.jsx';
import Message_system from './message_system.jsx';
class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Message />
        <Chatbar />
        <Message_system />
      </div>
    );
  }
}
export default App;
