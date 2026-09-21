
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
      <div className="bg-emerald-600 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-emerald-400/40">
        <CheckCircle className="w-4 h-4 text-emerald-200" />
        <span>{message}</span>
      </div>
    </div>
  );
};
