import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Sparkles, Edit3, ShieldAlert, X } from 'lucide-react';

interface SummaryBoxProps {
  isOpen: boolean;
  onClose: () => void;
  summaryText: string;
  onCopySuccess: () => void;
}

export const SummaryBox: React.FC<SummaryBoxProps> = ({
  isOpen,
  onClose,
  summaryText,
  onCopySuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');

  // Sync customText when summaryText prop changes while in edit mode
  useEffect(() => {
    if (isEditing) {
      setCustomText(summaryText);
    }
  }, [summaryText, isEditing]);

  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
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

  const currentSummary = isEditing ? customText : summaryText;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentSummary);
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleToggleEdit = () => {
    if (!isEditing) {
      setCustomText(summaryText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border-2 border-teal-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl shadow-teal-950/40 max-w-xl w-full max-h-[85vh] flex flex-col space-y-3 relative overflow-hidden animate-[scaleUp_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow highlight */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
            <h3 className="text-base font-bold text-slate-100">Auto-Summary</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-teal-500/30">
              Digital IPD Format
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleEdit}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-teal-400" />
              <span>{isEditing ? 'ใช้ Auto' : 'แก้ไขข้อความ'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
              aria-label="ปิด"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary Content Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 text-slate-100 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-wrap min-h-[140px] max-h-[360px]">
          {isEditing ? (
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full h-full bg-transparent text-slate-100 text-xs sm:text-sm focus:outline-none resize-none min-h-[160px]"
              placeholder="พิมพ์แก้ไขข้อความสรุปได้ที่นี่..."
            />
          ) : (
            <span className="select-text">{summaryText}</span>
          )}
        </div>

        {/* Clinical Integrity Warning Banner */}
        <div className="flex items-start gap-2 text-[11px] text-amber-300/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 flex-shrink-0">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <span>ข้อมูลนี้เป็นสรุปดิบ (Raw Summary) สำหรับวางใน Digital IPD — การประเมิน Risk Level ขึ้นอยู่กับดุลพินิจของจิตแพทย์</span>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-2.5 pt-1 flex-shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 min-h-[48px] py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-[0.99] select-none ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-900/50 ring-2 ring-emerald-400'
                : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-teal-900/50 ring-1 ring-teal-300/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 animate-bounce" />
                <span>คัดลอกเรียบร้อย! (พร้อมวางใน Digital IPD)</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>กดเดียว Copy ทั้งหมด</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors cursor-pointer border border-slate-700"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
