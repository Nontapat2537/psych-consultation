# แผนพัฒนาฟอร์มประเมินภาวะสับสนเฉียบพลัน (Delirium Assessment Form)

> สำหรับใช้ในงาน **Consultation-Liaison (C-L) Psychiatry** เพื่อประเมินเคส Delirium ในหอผู้ป่วยใน (IPD) และสร้าง Summary อัตโนมัติลง Digital IPD

---

## 1. โครงสร้าง Checklist ทางคลินิก (CAM-Based + Clinical Subtypes)

อ้างอิงตามเกณฑ์ **Confusion Assessment Method (CAM)** และ **DSM-5-TR**:

### 1.1 Core CAM Criteria (เกณฑ์วินิจฉัยหลัก)
1. **Acute onset & Fluctuating course (อาการเกิดขึ้นเฉียบพลัน & มีลักษณะขึ้นๆ ลงๆ)**
   - ตัวเลือก: `ตรวจพบ (Yes)` / `ไม่พบ (No)` / `ไม่แน่ชัด`
2. **Inattention (ความสนใจลดลง / เสียสมาธิ)**
   - ตัวเลือก: `ตรวจพบ (Yes)` (เช่น ถามไม่ตรงคำตอบ หลุดง่าย สะกดคำถอยหลังไม่ได้) / `ปกติ (No)`
3. **Disorganized thinking (ความคิดสับสน / พูดไม่ปะติดปะต่อ)**
   - ตัวเลือก: `ตรวจพบ (Yes)` / `ไม่พบ (No)`
4. **Altered Level of Consciousness (ระดับความรู้สึกตัวผิดปกติ)**
   - ตัวเลือก: `Alert (ปกติ)` / `Hyperalert (ตื่นตัวมากเกิน)` / `Lethargic/Stupor (ซึม/หลับง่าย)`

### 1.2 Clinical Subtypes & Baseline (ลักษณะเฉพาะเคส)
5. **Motor Subtype (รูปแบบการแสดงออก):**
   - ตัวเลือก: `Hyperactive (เอะอะวุ่นวาย/ดึงสาย)` / `Hypoactive (ซึม/นิ่ง/หลับมาก)` / `Mixed (กลางวันซึม กลางคืนวุ่นวาย)`
6. **Sleep-Wake Cycle Disturbance (วงจรการนอนสลับวัน-คืน):**
   - ตัวเลือก: `มี (Yes)` / `ไม่มี (No)`
7. **Perceptual Disturbance (ภาพหลอน/หูแว่ว/Illusions):**
   - ตัวเลือก: `Visual Hallucination` / `Auditory Hallucination` / `ไม่พบ`
8. **Baseline Cognitive Impairment:**
   - ตัวเลือก: `Normal Baseline` / `Pre-existing Dementia / Cognitive Decline` / `ไม่ทราบข้อมูล`

---

## 2. ข้อมูลดิบเพิ่มเติม (Optional Raw Data Inputs)

1. **Suspected Precipitating Causes (สาเหตุทางกายที่สงสัย):**
   - ช่องกรอกด่วนพร้อม Tag ด่วน:
     - `Infection (Sepsis/UTI/Pneumonia)`
     - `Electrolyte imbalance (Hyponatremia/Hypokalemia)`
     - `Metabolic (Uremia/Hepatic Encephalopathy/Hypoglycemia)`
     - `Hypoxia / Hypercapnia`
     - `Post-operative / Pain`
     - `Medications (Anticholinergics/Opioids/Sedatives)`
     - `Alcohol/Substance Withdrawal`
2. **Impression / Diagnosis:**
   - ตัวอย่าง: `Delirium (Mixed type), likely secondary to Sepsis with UTI, on top of Pre-existing Dementia`
3. **Plan of Management:**
   - **Non-pharmacological:** Re-orientation, Sleep hygiene (เปิดไฟกลางวัน/หรี่ไฟกลางคืน), Family presence, Avoid physical restraint, Early mobilization
   - **Pharmacological (if needed):** Low-dose Antipsychotic (e.g. Haloperidol 0.5–1 mg prn, Quetiapine 12.5–25 mg)

---

## 3. รูปแบบข้อความสรุปอัตโนมัติ (Digital IPD Format)

```text
[Delirium Assessment (CAM)]
- CAM Criteria: ตรวจพบ Acute onset & fluctuating course, Inattention, Altered level of consciousness (เข้าได้กับภาวะ Delirium)
- Motor subtype: Mixed type (กลางวันซึม กลางคืนสับสนวุ่นวาย)
- Perceptual disturbance: Visual hallucinations (เห็นเงาคน)
- Baseline cognition: Pre-existing Dementia
- Suspected etiologies: Sepsis secondary to UTI, Polypharmacy

[Impression]
Delirium (Mixed subtype), likely secondary to Sepsis with UTI, on top of Dementia

[Plan of Management]
1. Treat underlying medical condition (Control infection & correct electrolytes)
2. Non-pharmacological interventions:
   - Re-orientation with calendar, clock, and familiar objects
   - Day-night cycle regulation (bright light during daytime, minimize noise/interventions at night)
   - Fall precautions & avoid physical restraints if possible
   - Encourage family member / sitter presence
3. Pharmacological:
   - Haloperidol (0.5 mg) 1 tab po prn for severe agitation q 4-6 hr (Hold if excessive sedation / QTc prolonged)
```

---

## 4. แผนการ Implement ทางเทคนิคในโปรเจกต์

| ลำดับ | ไฟล์ที่จะพัฒนา | รายละเอียด |
| :---: | :--- | :--- |
| **1** | `src/data/templates.ts` | เพิ่ม items ของ `DELIRIUM_TEMPLATE` พร้อม `isMvp: true` |
| **2** | `src/types/index.ts` | เพิ่ม Type เฉพาะสำหรับ Delirium checklist & raw data |
| **3** | `src/utils/summaryGenerator.ts` | เพิ่มฟังก์ชัน `generateDeliriumSummary()` รองรับการแปลผล CAM และ Non-pharm plan |
| **4** | `src/App.tsx` | สลับ Template ระหว่าง Suicidal Risk กับ Delirium ได้อย่างสมบูรณ์ |
| **5** | `src/components/RawDataInputs.tsx` | ปรับ Tag แนะนำให้ตรงตาม Template ที่เลือก (เช่น แท็กสาเหตุ I WATCH DEATH) |
