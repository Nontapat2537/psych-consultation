
import type { ChecklistItemDef, ItemOption } from '../types';
import { CheckCircle2, XCircle, AlertCircle, HelpCircle, MinusCircle } from 'lucide-react';

interface ChecklistCardProps {
  item: ChecklistItemDef;
  selectedValue: ItemOption;
  onSelectOption: (itemId: string, value: ItemOption) => void;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
  item,
  selectedValue,
  onSelectOption,
}) => {
  const isSelected = selectedValue !== 'unspecified';

  return (
    <div
      className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all border ${
        isSelected
          ? 'bg-slate-800/90 border-slate-700 shadow-md ring-1 ring-teal-500/20'
          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/60'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-100">{item.label}</span>
            <span className="text-xs text-slate-400 font-medium">({item.labelTh})</span>
          </div>
        </div>

        {isSelected && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <CheckCircle2 className="w-3 h-3" />
            ติ้กแล้ว
          </span>
        )}
      </div>

      {/* Touch-optimized option buttons grid */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {item.options.map((opt) => {
          const active = selectedValue === opt.value;

          // Distinct styling per choice
          let activeStyles = 'bg-teal-600 text-white border-teal-500 shadow-sm';
          if (opt.value === 'yes') {
            activeStyles = 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40 ring-2 ring-rose-400/30';
          } else if (opt.value === 'no') {
            activeStyles = 'bg-slate-700 text-emerald-300 border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/30';
          } else if (opt.value === 'ambivalent') {
            activeStyles = 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-900/40 ring-2 ring-amber-400/30';
          } else if (opt.value === 'denies') {
            activeStyles = 'bg-indigo-600 text-white border-indigo-500 shadow-sm ring-2 ring-indigo-400/30';
          }

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                onSelectOption(
                  item.id,
                  active ? 'unspecified' : opt.value
                )
              }
              className={`flex-1 min-h-[44px] px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none active:scale-[0.98] ${
                active
                  ? activeStyles
                  : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              {opt.value === 'yes' && <AlertCircle className="w-3.5 h-3.5 opacity-80" />}
              {opt.value === 'no' && <XCircle className="w-3.5 h-3.5 opacity-80" />}
              {opt.value === 'ambivalent' && <MinusCircle className="w-3.5 h-3.5 opacity-80" />}
              {opt.value === 'denies' && <CheckCircle2 className="w-3.5 h-3.5 opacity-80" />}
              {opt.value === 'unspecified' && <HelpCircle className="w-3.5 h-3.5 opacity-80" />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
