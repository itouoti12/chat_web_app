import { useState, useEffect, useRef } from 'react';
import { sendMessageToOpenAI } from '../externals/openai';
import type { Message } from '../types';
import { LuSend } from 'react-icons/lu';
import { FaEraser } from "react-icons/fa";
import ConfirmModal from './ConfirmModal';
import ChatMessage from './ChatMessage';

const STORAGE_KEY = 'chat_history';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setMessages(parsed);
      } catch (e) {
        console.error('Failed to parse chat history:', e);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await sendMessageToOpenAI(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      
      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const confirmClear = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl h-[90vh] md:h-[90vh] bg-dark-bg-primary md:rounded-2xl rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-dark-border-light">
      <div className="bg-dark-bg-secondary text-white p-5 flex justify-between items-center shadow-lg border-b border-dark-border-light">
        <h1 className="m-0 text-2xl font-semibold">AI Chat Assistant</h1>
        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="bg-secondary hover:bg-secondary-hover text-white border-none px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors duration-300 flex items-center gap-2"
          >
            <FaEraser />
            <span>Clear History</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5 bg-dark-bg-deep">
        {messages.length === 0 && (
          <div className="flex justify-center items-center h-full text-gray-500 text-lg">
            <p>👋 Welcome! Send a message to start chatting with AI.</p>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <ChatMessage
            message={{
              id: 'loading',
              role: 'assistant',
              content: '',
              timestamp: Date.now(),
            }}
            isLoading={true}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="bg-error-bg text-error-text p-3 text-center border-t border-error-border">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3 p-5 bg-dark-bg-secondary border-t border-dark-border-light">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 border-2 border-dark-border bg-dark-bg-primary text-white placeholder-gray-500 rounded-3xl text-base outline-none transition-colors duration-300 focus:border-primary disabled:bg-gray-900 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-primary hover:bg-primary-hover text-white border-none px-6 py-3 rounded-3xl text-base font-semibold cursor-pointer transition-all duration-200 hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_4px_12px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? 'Sending...' : (
            <>
              <span>Send</span>
              <LuSend />
            </>
          )}
        </button>
      </form>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmClear}
        title="Clear Chat History"
        message="Are you sure you want to clear all chat history? This action cannot be undone."
        confirmText="Clear"
        cancelText="Cancel"
      />
    </div>
  );
}
