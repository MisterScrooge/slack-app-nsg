import './App.css';
import React from 'react'
import Trial from './components/Trial'
import UserReg from './components/UserReg';
import LoginAsync from './components/LoginAsync';
import { LoginProvider } from "./context/LoginContext"
import SendMessage from './components/SendMessage';
import UserList from './components/UserList';
import ReceiveMessage from './components/ReceiveMessage';
import UserChannel from './components/UserChannel';
import ChannelDetails from './components/ChannelDetails';

// API url
// http://206.189.91.54/api/v1

function App() {
  return (
    <LoginProvider>
      <div>
        {/* <UserReg /> */}
        {/* <Trial /> */}
        <LoginAsync />
        <SendMessage />
        <UserList />
        <ReceiveMessage />
        <UserChannel />
        <ChannelDetails />
      </div>
    </LoginProvider>
  );
}

export default App;