import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TemplateTabs } from './components/TemplateTabs';
import { ChecklistCard } from './components/ChecklistCard';
import { RawDataInputs } from './components/RawDataInputs';
import { SummaryBox } from './components/SummaryBox';
import { Toast } from './components/Toast';
import { QRCodeModal } from './components/QRCodeModal';
import { SUICIDE_RISK_TEMPLATE } from './data/templates';
import type { ChecklistState, ItemOption, RawDataState } from './types';
import { generateSummary } from './utils/summaryGenerator';
import { Sparkles, CheckSquare, Layers, FileText } from 'lucide-react';

const INITIAL_CHECKLIST: ChecklistState = {
  suicidal_ideation: 'unspecified',
  plan: 'unspecified',
  means: 'unspecified',
  intent: 'unspecified',
  previous_attempt: 'unspecified',
  self_harm: 'unspecified',
  substance_use: 'unspecified',
  protective_factors: 'unspecified',
  psychosis: 'unspecified',
  depression: 'unspecified',
  anxiety: 'unspecified',
};

const INITIAL_RAW_DATA: RawDataState = {
  planDetails: '',
  protectiveDetails: '',
  impression: '',
  planOfManagement: '',
  additionalNotes: '',
};

export const App: React.FC = () => {
  const [activeTemplateId, setActiveTemplateId] = useState<string>('suicide-risk');
  const [checklist, setChecklist] = useState<ChecklistState>(() => {
    try {
      const saved = localStorage.getItem('psych_checklist_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed data has the expected shape
        if (parsed && typeof parsed === 'object') return { ...INITIAL_CHECKLIST, ...parsed };
      }
    } catch (err) {
      console.warn('Failed to parse saved checklist state, using defaults', err);
      localStorage.removeItem('psych_checklist_state');
    }
    return INITIAL_CHECKLIST;
  });

  const [rawData, setRawData] = useState<RawDataState>(() => {
    try {
      const saved = localStorage.getItem('psych_raw_data_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...INITIAL_RAW_DATA, ...parsed };
      }
    } catch (err) {
      console.warn('Failed to parse saved raw data state, using defaults', err);
      localStorage.removeItem('psych_raw_data_state');
    }
    return INITIAL_RAW_DATA;
  });

  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

  // Auto-save state to LocalStorage for offline resilience
  useEffect(() => {
    localStorage.setItem('psych_checklist_state', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('psych_raw_data_state', JSON.stringify(rawData));
  }, [rawData]);

  const handleSelectOption = (itemId: string, value: ItemOption) => {
    setChecklist((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleRawDataChange = (key: keyof RawDataState, value: string) => {
    setRawData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetRequest = useCallback(() => {
    setShowResetConfirm(true);
  }, []);

  const handleResetConfirm = useCallback(() => {
    setChecklist(INITIAL_CHECKLIST);
    setRawData(INITIAL_RAW_DATA);
    localStorage.removeItem('psych_checklist_state');
    localStorage.removeItem('psych_raw_data_state');
    setShowResetConfirm(false);
    triggerToast('ล้างข้อมูลเริ่มเคสใหม่เรียบร้อยแล้ว');
  }, []);

  const handleResetCancel = useCallback(() => {
    setShowResetConfirm(false);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const completedCount = Object.values(checklist).filter(
    (val) => val !== 'unspecified'
  ).length;
  const totalCount = SUICIDE_RISK_TEMPLATE.items.length;

  const currentSummary = generateSummary(checklist, rawData, activeTemplateId);

  // Quick fill preset helper for doctors in a hurry — dynamically built from template
  const quickFillNormal = () => {
    const filled: ChecklistState = {};
    SUICIDE_RISK_TEMPLATE.items.forEach((item) => {
      // Pick the safest/negative option: prefer 'no', then 'denies', fallback to first non-unspecified
      if (item.id === 'protective_factors') {
        filled[item.id] = 'yes'; // protective factors: "มี" is the safe/normal option
      } else {
        const noOpt = item.options.find((o) => o.value === 'no');
        const deniesOpt = item.options.find((o) => o.value === 'denies');
        filled[item.id] = noOpt ? 'no' : deniesOpt ? 'denies' : 'unspecified';
      }
    });
    setChecklist(filled);
    triggerToast('ติ้ก "ไม่มีความเสี่ยง/ปกติ" ทั้งหมดเรียบร้อย');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col pb-24 selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <Header
        onReset={handleResetRequest}
        onOpenQR={() => setShowQRModal(true)}
        completedCount={completedCount}
        totalCount={totalCount}
      />

      {/* Template Tab Switcher */}
      <TemplateTabs activeId={activeTemplateId} onSelect={setActiveTemplateId} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {/* Template Info & Quick Actions Banner */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 shadow-sm">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse flex-shrink-0" />
              <h2 className="text-sm sm:text-base font-bold text-slate-100 truncate">
                {SUICIDE_RISK_TEMPLATE.titleTh}
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 hidden xs:block">
              {SUICIDE_RISK_TEMPLATE.description}
            </p>
          </div>

          <button
            type="button"
            onClick={quickFillNormal}
            className="w-full sm:w-auto text-xs font-medium bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 px-3 py-1.5 sm:py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Quick-Fill: ปฏิเสธทั้งหมด</span>
          </button>
        </div>

        {/* 5.1 Checklist Suicide Risk Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-bold text-slate-200">1. Checklist (แตะเลือกปุ่ม)</h3>
            </div>
            <span className="text-[11px] text-slate-400">
              แตะสลับ: มี / ไม่มี / ปฏิเสธ
            </span>
          </div>

          <div className="space-y-2.5">
            {SUICIDE_RISK_TEMPLATE.items.map((item) => (
              <ChecklistCard
                key={item.id}
                item={item}
                selectedValue={checklist[item.id] || 'unspecified'}
                onSelectOption={handleSelectOption}
              />
            ))}
          </div>
        </section>

        {/* 5.2 Raw Data Inputs Section */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center gap-2 px-1">
            <Layers className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-200">2. พิมพ์ Raw Data สั้นๆ (Optional)</h3>
          </div>

          <RawDataInputs rawData={rawData} onChange={handleRawDataChange} />
        </section>
      </main>

      {/* Floating Action Button (FAB) for Auto-Summary */}
      <div className="fixed bottom-6 right-5 z-40">
        <button
          type="button"
          onClick={() => setShowSummaryModal(true)}
          className="flex items-center gap-2 px-4 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-950/60 border border-teal-300/40 active:scale-95 transition-all cursor-pointer group hover:shadow-teal-500/25"
          aria-label="เปิดดู Auto-Summary"
        >
          <FileText className="w-5 h-5 text-teal-100 group-hover:scale-110 transition-transform" />
          <span>ดู Summary</span>
          <span className="ml-0.5 px-2 py-0.5 text-xs rounded-full bg-slate-900/70 text-teal-200 border border-teal-400/40 font-medium">
            {completedCount}/{totalCount}
          </span>
        </button>
      </div>

      {/* Auto-Summary Modal Popup */}
      <SummaryBox
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        summaryText={currentSummary}
        onCopySuccess={() => triggerToast('คัดลอก Auto-Summary เรียบร้อยแล้ว!')}
      />

      {/* QR Code / Share Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        onCopySuccess={() => triggerToast('คัดลอกลิงก์เรียบร้อยแล้ว!')}
      />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-[fadeIn_0.15s_ease-out]">
            <div className="flex items-center gap-2 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              <h3 className="text-base font-bold text-slate-100">ยืนยันล้างข้อมูล?</h3>
            </div>
            <p className="text-sm text-slate-300">ข้อมูล Checklist และ Raw Data ทั้งหมดจะถูกลบ ไม่สามารถกู้คืนได้</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleResetCancel}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleResetConfirm}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white border border-red-500 transition-all cursor-pointer shadow-lg shadow-red-900/40"
              >
                ล้างข้อมูลทั้งหมด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast show={showToast} message={toastMessage} />
    </div>
  );
};

export default App;
