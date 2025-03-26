import React, { useState } from 'react';
import { ChatProvider } from './components/ChatContext';
import ChatWindow from './components/ChatWindow';
import './App.css';
import logo from './able.png'

function App() {
  return (
    <ChatProvider>
      <div className="App">
      <header className="app-header">
        <h1>ChatAble</h1>
        <img src={logo} alt="Able Logo" className="app-logo" />
      </header>
        <div className="main-content">
        <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;
