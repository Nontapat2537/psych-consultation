import type { TemplateDef } from '../types';

export const SUICIDE_RISK_TEMPLATE: TemplateDef = {
  id: 'suicide-risk',
  title: 'Suicide Risk Assessment',
  titleTh: 'ประเมินความเสี่ยงทำร้ายตัวเอง/ฆ่าตัวตาย',
  isMvp: true,
  description: 'Checklist ประเมิน Suicidal Risk และปัจจัยที่เกี่ยวข้องสำหรับเคส Consult จิตเวช',
  items: [
    {
      id: 'suicidal_ideation',
      label: 'Suicidal ideation',
      labelTh: 'ความคิดทำร้ายตัวเอง / ฆ่าตัวตาย',
      category: 'risk',
      options: [
        { value: 'yes', label: 'มี (Yes)', labelTh: 'มี suicidal ideation' },
        { value: 'no', label: 'ไม่มี (No)', labelTh: 'ไม่มี suicidal ideation' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'plan',
      label: 'Plan',
      labelTh: 'แผนการทำร้ายตัวเอง',
      category: 'risk',
      options: [
        { value: 'yes', label: 'มี (Yes)', labelTh: 'มี plan' },
        { value: 'no', label: 'ไม่มี (No)', labelTh: 'ไม่มี plan' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'means',
      label: 'Means',
      labelTh: 'อุปกรณ์ / วิธีการในการทำ',
      category: 'risk',
      options: [
        { value: 'yes', label: 'มี (Yes)', labelTh: 'มี means' },
        { value: 'no', label: 'ไม่มี (No)', labelTh: 'ไม่มี means' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'intent',
      label: 'Intent',
      labelTh: 'ความตั้งใจจริงในการทำ',
      category: 'risk',
      options: [
        { value: 'yes', label: 'มี (Yes)', labelTh: 'มี intent' },
        { value: 'ambivalent', label: 'ไม่แน่ชัด (Ambivalent)', labelTh: 'intent ไม่แน่ชัด (ambivalent)' },
        { value: 'no', label: 'ไม่มี (No)', labelTh: 'ไม่มี intent' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'previous_attempt',
      label: 'Previous attempt',
      labelTh: 'ประวัติเคยพยายามฆ่าตัวตายมาก่อน',
      category: 'history',
      options: [
        { value: 'yes', label: 'มี (Yes)', labelTh: 'มีประวัติ previous attempt' },
        { value: 'no', label: 'ไม่มี (No)', labelTh: 'ไม่มีประวัติ previous attempt' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'self_harm',
      label: 'Self-harm (NSSI)',
      labelTh: 'ประวัติทำร้ายตัวเองโดยไม่ได้ตั้งใจฆ่าตัวตาย',
      category: 'history',
      options: [
        { value: 'yes', label: 'มี (Yes)', labelTh: 'มีประวัติ self-harm (NSSI)' },
        { value: 'no', label: 'ไม่มี (No)', labelTh: 'ไม่มีประวัติ self-harm' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'substance_use',
      label: 'Substance use',
      labelTh: 'การใช้สารเสพติด / แอลกอฮอล์',
      category: 'history',
      options: [
        { value: 'denies', label: 'ปฏิเสธ (Denies)', labelTh: 'ปฏิเสธ substance use' },
        { value: 'yes', label: 'มีประวัติใช้', labelTh: 'มีประวัติ substance use' },
        { value: 'no', label: 'ไม่มี', labelTh: 'ไม่มี substance use' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'protective_factors',
      label: 'Protective factors',
      labelTh: 'ปัจจัยปกป้อง / สิ่งยึดเหนี่ยวจิตใจ',
      category: 'protective',
      options: [
        { value: 'yes', label: 'มี (Yes)', labelTh: 'มี protective factors' },
        { value: 'no', label: 'ไม่มี (No)', labelTh: 'ไม่มี protective factors' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'psychosis',
      label: 'Psychosis',
      labelTh: 'อาการทางจิต (หูแว่ว/หลงผิด)',
      category: 'symptom',
      options: [
        { value: 'yes', label: 'ตรวจพบ (Yes)', labelTh: 'ตรวจพบ psychosis' },
        { value: 'no', label: 'ปฏิเสธ/ไม่พบ', labelTh: 'ไม่พบ psychosis' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'depression',
      label: 'Depression',
      labelTh: 'อารมณ์ซึมเศร้า / ภาวะซึมเศร้า',
      category: 'symptom',
      options: [
        { value: 'yes', label: 'ตรวจพบ (Yes)', labelTh: 'ตรวจพบ depression' },
        { value: 'no', label: 'ปฏิเสธ/ไม่พบ', labelTh: 'ไม่พบ depression' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    },
    {
      id: 'anxiety',
      label: 'Anxiety',
      labelTh: 'ความวิตกกังวล',
      category: 'symptom',
      options: [
        { value: 'yes', label: 'ตรวจพบ (Yes)', labelTh: 'ตรวจพบ anxiety' },
        { value: 'no', label: 'ปฏิเสธ/ไม่พบ', labelTh: 'ไม่พบ anxiety' },
        { value: 'unspecified', label: 'ไม่ระบุ', labelTh: 'ไม่ได้ระบุ' }
      ]
    }
  ]
};

export const ALL_TEMPLATES: TemplateDef[] = [
  SUICIDE_RISK_TEMPLATE,
  {
    id: 'delirium',
    title: 'Delirium Assessment',
    titleTh: 'ประเมินภาวะสับสนเฉียบพลัน (Delirium)',
    badge: 'Phase 2',
    isMvp: false,
    description: 'CAM Checklist, Fluctuating course, Inattention, Altered LOC (กำลังพัฒนา)',
    items: []
  },
  {
    id: 'depression',
    title: 'Depression Evaluation',
    titleTh: 'ประเมินภาวะซึมเศร้า (Depression)',
    badge: 'Phase 2',
    isMvp: false,
    description: 'SIGECAPS checklist & Depressive symptoms (กำลังพัฒนา)',
    items: []
  },
  {
    id: 'capacity',
    title: 'Decision Capacity',
    titleTh: 'ประเมินความสามารถในการตัดสินใจ',
    badge: 'Phase 2',
    isMvp: false,
    description: 'Understanding, Appreciation, Reasoning, Expressing choice (กำลังพัฒนา)',
    items: []
  },
  {
    id: 'agitation',
    title: 'Agitation & Violence',
    titleTh: 'ประเมินพฤติกรรมก้าวร้าว/สับสนวุ่นวาย',
    badge: 'Phase 2',
    isMvp: false,
    description: 'PAS Scale, Risk of Violence & Agitation management (กำลังพัฒนา)',
    items: []
  }
];
