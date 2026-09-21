export type ItemOption = 'yes' | 'no' | 'denies' | 'ambivalent' | 'unspecified';

export interface ChecklistOptionConfig {
  value: ItemOption;
  label: string;
  labelTh: string;
}

export interface ChecklistItemDef {
  id: string;
  label: string;
  labelTh: string;
  category: 'risk' | 'history' | 'symptom' | 'protective';
  options: ChecklistOptionConfig[];
}

export type ChecklistState = Record<string, ItemOption>;

export interface RawDataState {
  planDetails: string;
  protectiveDetails: string;
  impression: string;
  planOfManagement: string;
  additionalNotes: string;
}

export interface TemplateDef {
  id: string;
  title: string;
  titleTh: string;
  badge?: string;
  isMvp: boolean;
  description: string;
  items: ChecklistItemDef[];
}
