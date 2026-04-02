import type { Message } from '../types';
import type { ReactNode } from 'react';
import LoadingMessage from './LoadingMessage';
import { FaRobot, FaUser } from 'react-icons/fa';

interface ChatMessageProps {
  message: Message;
  userLabel?: string;
  aiLabel?: string;
  userIcon?: ReactNode;
  aiIcon?: ReactNode;
  isLoading?: boolean;
}

export default function ChatMessage({
  message,
  userLabel = 'You',
  aiLabel = 'AI',
  userIcon = <FaUser />,
  aiIcon = <FaRobot />,
  isLoading = false,
}: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`mb-4 p-3 rounded-xl md:max-w-[80%] max-w-[95%] animate-[slideIn_0.3s_ease-out] ${
        isUser
          ? 'bg-user-bg text-white ml-auto border border-user-border'
          : 'bg-dark-bg-secondary text-ai-text shadow-md border border-dark-border-light'
      }`}
    >
      <div className="flex justify-between mb-2 text-xs">
        <span className={`font-semibold flex items-center gap-1.5 ${isUser ? 'text-user-text' : 'text-ai-label'}`}>
          {isUser ? (
            <>
              {userIcon}
              <span>{userLabel}</span>
            </>
          ) : (
            <>
              {aiIcon}
              <span>{aiLabel}</span>
            </>
          )}
        </span>
        {!isLoading && (
          <span className={isUser ? 'text-user-time' : 'text-ai-time'}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="leading-relaxed break-words">
        {isLoading ? <LoadingMessage /> : message.content}
      </div>
    </div>
  );
}
