import type { ReactNode } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-dark-bg-primary border border-dark-border-light rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-[slideIn_0.3s_ease-out]">
        {/* Header */}
        <div className="p-6 border-b border-dark-border-light">
          <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-300 leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-dark-border-light flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-gray-300 bg-secondary hover:bg-secondary-hover font-medium transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-lg text-white bg-primary hover:bg-primary-hover font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
