
import type { RawDataState } from '../types';
import {
  FileText,
  Shield,
  AlertTriangle,
  Stethoscope,
  ClipboardList,
  MessageSquare,
} from 'lucide-react';

interface RawDataInputsProps {
  rawData: RawDataState;
  onChange: (key: keyof RawDataState, value: string) => void;
}

const PLAN_TAGS = ['กินยาเกินขนาด', 'ของมีคม/โดดตึก', 'มีปืนที่บ้าน', 'เตรียมจดหมาย', 'แจกจ่ายของสะสม'];
const PROTECTIVE_TAGS = ['ครอบครัว/ลูกสาว', 'ความเชื่อทางศาสนา', 'ความกลัวเจ็บ/กลัวตาย', 'เพื่อนสนิท/คู่ชีวิต', 'สัตว์เลี้ยง'];
const IMPRESSION_TAGS = [
  'Adjustment disorder',
  'Major Depressive Disorder (MDD)',
  'Delirium',
  'Substance-induced mood disorder',
  'No active psych symptoms',
];
const MANAGEMENT_TAGS = [
  'Suggest 1:1 observation',
  'Remove sharp objects & strict suicidal precaution',
  'Consult attending physician',
  'Follow-up Psych OPD after discharge',
  'Start Sertraline 25 mg/day',
  'Supportive psychotherapy',
];
const NOTES_TAGS = ['ญาติให้ประวัติเพิ่มเติม', 'ผู้ป่วยให้ความร่วมมือดี', 'ขอประวัติเพิ่มเติมจากตึก'];

export const RawDataInputs: React.FC<RawDataInputsProps> = ({ rawData, onChange }) => {
  const addTag = (key: keyof RawDataState, tag: string) => {
    const current = rawData[key];
    if (!current.trim()) {
      onChange(key, tag);
    } else {
      // Split by comma, trim each, and check for exact match
      const existingTags = current.split(',').map((t) => t.trim());
      if (!existingTags.includes(tag)) {
        onChange(key, `${current}, ${tag}`);
      }
    }
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-4 shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <FileText className="w-4 h-4 text-teal-400" />
        <h3 className="text-sm font-semibold text-slate-200">Raw Data & Plan of Management (Optional)</h3>
      </div>

      {/* Field 1: Plan details */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            รายละเอียด Plan / วิธีการทำร้ายตัวเอง
          </span>
          <span className="text-[11px] text-slate-500">Keyword สั้นๆ</span>
        </label>
        <input
          type="text"
          value={rawData.planDetails}
          onChange={(e) => onChange('planDetails', e.target.value)}
          placeholder="เช่น กินยาเกินขนาด 20 เม็ด, มีปืนที่บ้าน..."
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {PLAN_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag('planDetails', tag)}
              className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/50 active:scale-95 transition-all cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Field 2: Protective factors details */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            รายละเอียด Protective Factors (สิ่งยึดเหนี่ยว)
          </span>
          <span className="text-[11px] text-slate-500">Keyword สั้นๆ</span>
        </label>
        <input
          type="text"
          value={rawData.protectiveDetails}
          onChange={(e) => onChange('protectiveDetails', e.target.value)}
          placeholder="เช่น ครอบครัว, ลูกสาว, ศาสนา..."
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {PROTECTIVE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag('protectiveDetails', tag)}
              className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/50 active:scale-95 transition-all cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Field 3: Impression / Problem List */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5 text-purple-400" />
            Impression / Problem List
          </span>
          <span className="text-[11px] text-slate-500">การวินิจฉัยเบื้องต้น</span>
        </label>
        <input
          type="text"
          value={rawData.impression}
          onChange={(e) => onChange('impression', e.target.value)}
          placeholder="เช่น Adjustment disorder, MDD, Delirium..."
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {IMPRESSION_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag('impression', tag)}
              className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-200 border border-purple-800/40 active:scale-95 transition-all cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Field 4: Plan of Management */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ClipboardList className="w-3.5 h-3.5 text-sky-400" />
            Plan of Management (คำแนะนำดูแลรักษา)
          </span>
          <span className="text-[11px] text-slate-500">ข้อเสนอแนะทีมรักษา</span>
        </label>
        <textarea
          rows={2}
          value={rawData.planOfManagement}
          onChange={(e) => onChange('planOfManagement', e.target.value)}
          placeholder="เช่น Suggest 1:1 observation, remove sharp objects, follow up Psych OPD..."
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-y"
        />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {MANAGEMENT_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag('planOfManagement', tag)}
              className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-200 border border-sky-800/40 active:scale-95 transition-all cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Field 5: Additional Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
            หมายเหตุเพิ่มเติม (Optional)
          </span>
          <span className="text-[11px] text-slate-500">ข้อมูลบริบทอื่นๆ</span>
        </label>
        <input
          type="text"
          value={rawData.additionalNotes}
          onChange={(e) => onChange('additionalNotes', e.target.value)}
          placeholder="เช่น ญาติให้ประวัติเพิ่มเติม..."
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {NOTES_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag('additionalNotes', tag)}
              className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/50 active:scale-95 transition-all cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

