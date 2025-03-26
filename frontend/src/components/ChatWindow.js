import React, { useState, useContext, useEffect, useRef } from 'react';
import { ChatContext } from './ChatContext';
import MessageBubble from './MessageBubble';
import './ChatWindow.css'; 
import './LoadingSpinner.css'; 

function ChatWindow() {
  const { messages, setMessages } = useContext(ChatContext);  
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const hasInitiatedMessage = useRef(false);

  // Function to type the bot's message letter by letter
  const typeMessage = async (message) => {
    const words = message.split(' ');
    let currentMessage = '';

    for (let i = 0; i < words.length; i++) {
      currentMessage += (i === 0 ? '' : ' ') + words[i];

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = { sender: 'bot', text: currentMessage };
        return newMessages;
      });

      const delay = Math.random() * 150;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  // This useEffect will trigger the first message from the bot when the component is mounted
  useEffect(() => {
    if (!hasInitiatedMessage.current && messages.length === 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: '' } // Add an empty message for the bot to start the typing effect
      ]);
      hasInitiatedMessage.current = true; // Mark that the initial message was sent

      // Start typing the initial message after it’s added to the state
      typeMessage("Hello! I am ChatAble, the chat bot for the company Able. I'm here to help answer any questions you have and assist with your needs related to Able. How can I help you today?");
    }
  }, [messages.length, setMessages]);

  // Takes in a user input and then sends it to the flask server and updates the UI with the new message
  const handleSendMessage = async () => {
    if (userInput.trim()) {

      // Add the user's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: userInput }
      ]);

      setLoading(true);

      try {
        const response = await fetch('http://localhost:5000/api/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();

        if (data.message) {
          // Split the bot's response into words
          const words = data.message.split(' ');

          let currentMessage = '';
          
          // Function to update the last bot message with each word
          const typeMessage = async () => {
            for (let i = 0; i < words.length; i++) {
              currentMessage += (i === 0 ? '' : ' ') + words[i];

              setMessages((prevMessages) => {
                // Clone the previous messages
                const newMessages = [...prevMessages];

                // Update the last bot message
                newMessages[newMessages.length - 1] = { sender: 'bot', text: currentMessage };

                return newMessages;
              });

              // Random delay between 0 and 250ms
              const delay = Math.random() * 250;
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          };

          // Start the typing effect
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: '' } // Add an empty message for the bot
          ]);

          typeMessage();
        } else {
          console.error('No message received from bot');
        }
      } catch (error) {
        console.error('Error sending message to Flask:', error);
      } finally {
        setLoading(false);
      }

      setUserInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-window">
      <div className="message-list">
        {messages.map((message, index) => (
          <MessageBubble key={index} sender={message.sender} text={message.text} />
        ))}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
