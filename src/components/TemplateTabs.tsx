import React from 'react';
import { ALL_TEMPLATES } from '../data/templates';

interface TemplateTabsProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export const TemplateTabs: React.FC<TemplateTabsProps> = ({ activeId, onSelect }) => {
  return (
    <div className="bg-slate-900/60 border-b border-slate-800 px-3 py-1.5 overflow-x-auto no-scrollbar">
      <div className="max-w-3xl mx-auto flex space-x-1.5 min-w-max">
        {ALL_TEMPLATES.map((tmpl) => {
          const isActive = tmpl.id === activeId;
          return (
            <button
              key={tmpl.id}
              onClick={() => tmpl.isMvp && onSelect(tmpl.id)}
              disabled={!tmpl.isMvp}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-900/30 ring-1 ring-teal-400/30 font-semibold'
                  : tmpl.isMvp
                  ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                  : 'bg-slate-900/40 text-slate-500 border border-slate-800/60 cursor-not-allowed opacity-60'
              }`}
            >
              <span>{tmpl.titleTh}</span>
              {tmpl.badge && (
                <span className="px-1 py-0.2 text-[8px] bg-slate-800/80 text-slate-400 rounded border border-slate-700">
                  {tmpl.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
