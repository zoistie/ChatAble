import React, { useState } from 'react';

function StartupPage({ onStart }) {
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [error, setError] = useState('');

  const handleStart = async() => {
    if (!name.trim()) {
      setError('Please enter your name before starting.');
      return;
    }

    setError('');
    try {
        const response = await fetch('http://localhost:5000/api/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, system_prompt: systemPrompt.trim() || 'None' }),
        });
  
        const data = await response.json();
        console.log('Server Response:', data);
  
        onStart(name, systemPrompt.trim() || 'None'); // Continue to chat window
      } catch (error) {
        console.error('Error sending user data:', error);
        setError('Failed to start chat. Please try again.');
      }
    };

  return (
    <div className="startup-page">
      <h2>Welcome to the Chat Application</h2>
      <p>Please enter your name to begin using the chat.</p>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Error Message (if any) */}
      {error && <div className="error-message">{error}</div>}

      {/* Start Button placed below name input */}
      <button onClick={handleStart}>Start</button>

      {/* System Prompt Input (Optional) */}
      <p>Optional: Enter a system prompt</p>
      <textarea
        placeholder="Enter system prompt (optional)..."
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
    </div>
  );
}

export default StartupPage;
