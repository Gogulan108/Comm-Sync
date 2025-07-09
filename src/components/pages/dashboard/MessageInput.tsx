import React, { useState } from 'react';
import Button from '../../atoms/button/Button';

type MessageInputProps = {
  onSend: (text: string) => void;
  isLoading: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({ onSend, isLoading }) => {
  const [value, setValue] = useState('');
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2 mt-4 rounded-xl shadow-md bg-white px-3 py-2">
      <button
        type="button"
        tabIndex={-1}
        className="text-xl px-2 focus:outline-none hover:bg-gray-100 rounded-full transition"
        title="Add emoji"
        // You can add emoji picker logic here
      >
        📎
      </button>
      <input
        className="flex-1 px-3 py-2 border border-gray-200 bg-transparent placeholder:text-gray-300 text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ color: '#222' }}
      />
      <Button
        isLoading={isLoading}
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
