import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface TaskFormProps {
  onSubmit: (data: { username: string; email: string; text: string }) => void;
  loading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, loading }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, email, text });
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-semibold text-blue-700 mb-2" htmlFor="username">Username</label>
        <input
          id="username"
          className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-lg shadow-sm transition"
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={e => setUsername((e.target as HTMLInputElement).value)}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-blue-700 mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-lg shadow-sm transition"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail((e.target as HTMLInputElement).value)}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-blue-700 mb-2" htmlFor="text">Task description</label>
        <textarea
          id="text"
          className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-lg shadow-sm transition"
          placeholder="Describe the task"
          value={text}
          onChange={e => setText((e.target as HTMLTextAreaElement).value)}
          required
        />
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 text-lg shadow-lg transition disabled:opacity-50 mt-2"
        type="submit"
        disabled={loading}
      >
        {React.createElement(FaPlus as any, { className: "inline align-middle" })}
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
