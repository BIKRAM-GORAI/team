import React from 'react';

const ChatBubble = ({ message }) => {
  return (
    <div>
      <p>{message.text}</p>
    </div>
  );
};

export default ChatBubble;
