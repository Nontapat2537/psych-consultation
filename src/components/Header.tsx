
import { Stethoscope, RotateCcw, ShieldCheck, QrCode } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenQR: () => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onOpenQR, completedCount, totalCount }) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-3 shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-inner">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-base tracking-tight text-slate-100">Psych Consult</h1>
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">
                PWA
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
              <span>100% Offline & Private</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-right mr-1 hidden xs:block">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              ติ้กแล้ว
            </span>
            <span className="text-sm font-bold text-teal-400">
              {completedCount} <span className="text-slate-500 text-xs">/ {totalCount}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenQR}
            className="flex items-center gap-1.5 bg-teal-500/10 hover:bg-teal-500/20 active:scale-95 text-teal-300 text-xs px-2.5 py-2 rounded-lg border border-teal-500/30 transition-all shadow-sm cursor-pointer select-none"
            title="เปิด QR Code สำหรับมือถือ / แชร์แอป"
          >
            <QrCode className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-semibold hidden sm:inline">QR มือถือ</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onReset();
            }}
            className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 text-amber-300 text-xs px-3 py-2 rounded-lg border border-amber-500/30 transition-all shadow-sm cursor-pointer select-none"
            title="ล้างข้อมูลเริ่มเคสใหม่"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">เคสใหม่</span>
          </button>
        </div>
      </div>
    </header>
  );
};
