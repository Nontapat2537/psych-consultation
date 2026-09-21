import { useState, useEffect, useCallback } from 'react';
import { QrCode, Copy, Check, X, Smartphone, ExternalLink } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl?: string;
  onCopySuccess?: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  appUrl = 'https://Nontapat2537.github.io/psych-consultation/',
  onCopySuccess,
}) => {
  const [copied, setCopied] = useState(false);

  // ESC to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      if (onCopySuccess) onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border-2 border-teal-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-teal-950/50 max-w-sm w-full flex flex-col space-y-4 relative overflow-hidden animate-[scaleUp_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow highlight */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">เปิดใช้งานบนมือถือ</h3>
              <p className="text-[11px] text-slate-400">สแกน QR หรือแชร์ให้เพื่อนร่วมงาน</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-inner border border-slate-700/50">
          <img
            src="./app-qr.png"
            alt="Psych Consult App QR Code"
            className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
          />
          <span className="text-[11px] font-semibold text-slate-600 mt-1 flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-teal-600" />
            สแกนด้วยกล้องมือถือ / Line
          </span>
        </div>

        {/* Copy Link Section */}
        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl p-2 text-xs">
          <span className="text-slate-400 truncate flex-1 font-mono text-[11px] pl-1 select-all">
            {appUrl}
          </span>
          <button
            type="button"
            onClick={handleCopyLink}
            className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 select-none ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-600/30 hover:bg-teal-600/50 text-teal-300 border border-teal-500/40'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>คัดลอกแล้ว</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>คัดลอกลิงก์</span>
              </>
            )}
          </button>
        </div>

        {/* PWA Install Guide */}
        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-2.5 text-[11px] text-slate-300 space-y-1">
          <p className="font-semibold text-teal-300 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> วิธีติดตั้งเป็นแอป (PWA):
          </p>
          <ul className="text-slate-400 list-disc list-inside space-y-0.5 pl-0.5">
            <li><strong className="text-slate-300">iOS (Safari):</strong> แตะปุ่มแชร์ <span className="text-teal-400">Share</span> → เพิ่มไปยังหน้าจอโฮม</li>
            <li><strong className="text-slate-300">Android (Chrome):</strong> แตะเมนู <span className="text-teal-400">3 จุด</span> → ติดตั้งแอป</li>
          </ul>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
        >
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
};
