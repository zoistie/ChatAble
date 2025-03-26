
import React from 'react';
import './MessageBubble.css';  

// A message bubble that is used when a user or a bot sends  
// a message in the chatwindow

function MessageBubble({ sender, text }) {
  return (
    <div className={`message-bubble ${sender}`}>
      <p>{text}</p>
    </div>
  );
}

export default MessageBubble;
