import type { ChecklistState, RawDataState } from '../types';

export function generateSummary(
  checklist: ChecklistState,
  rawData: RawDataState,
  templateId: string = 'suicide-risk'
): string {
  if (templateId !== 'suicide-risk') {
    return 'สรุปผลสำหรับ Template นี้จะเปิดใช้งานใน Phase 2';
  }

  const parts: string[] = [];

  // 1. Suicidal Ideation
  const ideation = checklist['suicidal_ideation'];
  if (ideation === 'yes') {
    parts.push('ผู้ป่วยมี suicidal ideation');
  } else if (ideation === 'no') {
    parts.push('ผู้ป่วยไม่มี suicidal ideation');
  }

  // 2. Plan
  const plan = checklist['plan'];
  if (plan === 'yes') {
    let text = 'มี plan';
    if (rawData.planDetails.trim()) {
      text += ` (${rawData.planDetails.trim()})`;
    }
    parts.push(text);
  } else if (plan === 'no') {
    parts.push('ไม่มี plan');
  }

  // 3. Means
  const means = checklist['means'];
  if (means === 'yes') {
    parts.push('มี means');
  } else if (means === 'no') {
    parts.push('ไม่มี means');
  }

  // 4. Intent
  const intent = checklist['intent'];
  if (intent === 'yes') {
    parts.push('มี intent');
  } else if (intent === 'ambivalent') {
    parts.push('intent ไม่แน่ชัด (ambivalent)');
  } else if (intent === 'no') {
    parts.push('ไม่มี intent');
  }

  // 5. Previous Attempt
  const prevAttempt = checklist['previous_attempt'];
  if (prevAttempt === 'yes') {
    parts.push('มีประวัติ previous attempt');
  } else if (prevAttempt === 'no') {
    parts.push('ไม่มีประวัติ previous attempt');
  }

  // 5.5 Self-harm (NSSI)
  const selfHarm = checklist['self_harm'];
  if (selfHarm === 'yes') {
    parts.push('มีประวัติ self-harm (NSSI)');
  } else if (selfHarm === 'no') {
    parts.push('ไม่มีประวัติ self-harm');
  }

  // 6. Substance Use
  const substance = checklist['substance_use'];
  if (substance === 'denies') {
    parts.push('ปฏิเสธ substance use');
  } else if (substance === 'yes') {
    parts.push('มีประวัติ substance use');
  } else if (substance === 'no') {
    parts.push('ไม่มี substance use');
  }

  // 7. Protective Factors
  const protective = checklist['protective_factors'];
  if (protective === 'yes') {
    let text = 'มี protective factors';
    if (rawData.protectiveDetails.trim()) {
      text += ` (${rawData.protectiveDetails.trim()})`;
    }
    parts.push(text);
  } else if (protective === 'no') {
    parts.push('ไม่มี protective factors');
  }

  // 8. Symptoms (Psychosis, Depression, Anxiety)
  const psychosis = checklist['psychosis'];
  const depression = checklist['depression'];
  const anxiety = checklist['anxiety'];

  const foundSymptoms: string[] = [];
  const deniedSymptoms: string[] = [];

  if (psychosis === 'yes') foundSymptoms.push('psychosis');
  else if (psychosis === 'no') deniedSymptoms.push('psychosis');

  if (depression === 'yes') foundSymptoms.push('depression');
  else if (depression === 'no') deniedSymptoms.push('depression');

  if (anxiety === 'yes') foundSymptoms.push('anxiety');
  else if (anxiety === 'no') deniedSymptoms.push('anxiety');

  if (foundSymptoms.length > 0) {
    parts.push(`ตรวจพบ ${foundSymptoms.join(', ')}`);
  }
  if (deniedSymptoms.length > 0) {
    parts.push(`ปฏิเสธ/ไม่พบ ${deniedSymptoms.join(', ')}`);
  }

  const hasChecklistData = parts.length > 0;
  const hasImpression = Boolean(rawData.impression?.trim());
  const hasPlan = Boolean(rawData.planOfManagement?.trim());
  const hasNotes = Boolean(rawData.additionalNotes?.trim());

  if (!hasChecklistData && !hasImpression && !hasPlan && !hasNotes) {
    return 'ยังไม่ได้เลือกข้อมูล Checklist (กรุณาติ้กรายการด้านบนเพื่อสร้าง Auto-Summary)';
  }

  const sections: string[] = [];

  // Section 1: Assessment Summary
  if (hasChecklistData) {
    sections.push(`[Suicide Risk Assessment]\n${parts.join(', ')}`);
  }

  // Section 2: Impression / Problem List
  if (hasImpression) {
    sections.push(`[Impression / Problem List]\n${rawData.impression.trim()}`);
  }

  // Section 3: Plan of Management
  if (hasPlan) {
    sections.push(`[Plan of Management]\n${rawData.planOfManagement.trim()}`);
  }

  // Section 4: Additional Notes
  if (hasNotes) {
    sections.push(`[หมายเหตุเพิ่มเติม]\n${rawData.additionalNotes.trim()}`);
  }

  return sections.join('\n\n');
}
