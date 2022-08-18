import './App.css';
import React from 'react'
import { useState } from 'react';
import Trial from './components/Trial'
import UserReg from './components/UserReg';
import LoginAsync from './components/LoginAsync';

// API url
// http://206.189.91.54/api/v1

function App() {
  const [loginHeaders, setLoginHeaders] = useState({
    expiry: '',
  })

  return (
    <div>
      {/* <UserReg /> */}
      {/* <Trial /> */}
      <LoginAsync loginHeaders={loginHeaders} setLoginHeaders={setLoginHeaders} />
    </div>
  );
}

export default App;