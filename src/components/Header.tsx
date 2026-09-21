
import { Stethoscope, RotateCcw, ShieldCheck, QrCode } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenQR: () => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onOpenQR, completedCount, totalCount }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 shadow-md">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner flex-shrink-0">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-sm sm:text-base tracking-tight text-slate-100">Psych Consult</h1>
              <span className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-semibold bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
              <span>100% Offline & Private</span>
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="text-right mr-1 hidden md:block">
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
              ติ้กแล้ว
            </span>
            <span className="text-xs font-bold text-teal-400">
              {completedCount} <span className="text-slate-500 text-[10px]">/ {totalCount}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenQR}
            className="flex items-center gap-1 bg-teal-500/10 hover:bg-teal-500/20 active:scale-95 text-teal-300 text-xs px-2 py-1.5 rounded-lg border border-teal-500/30 transition-all shadow-sm cursor-pointer select-none"
            title="เปิด QR Code สำหรับมือถือ / แชร์แอป"
          >
            <QrCode className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-medium text-[11px] sm:text-xs hidden xs:inline">QR มือถือ</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onReset();
            }}
            className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 text-amber-300 text-xs px-2.5 py-1.5 rounded-lg border border-amber-500/30 transition-all shadow-sm cursor-pointer select-none"
            title="ล้างข้อมูลเริ่มเคสใหม่"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-[11px] sm:text-xs">เคสใหม่</span>
          </button>
        </div>
      </div>
    </header>
  );
};
