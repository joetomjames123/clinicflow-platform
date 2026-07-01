# ClinicFlow — Role & Workflow Enhancements

Scope covers Super Admin, Clinic Admin, Doctor, and Receptionist. All changes are UI/state only (no backend); WhatsApp send opens `wa.me/<phone>?text=...`; downloads produce CSV/PDF blobs client-side.

## 1. Super Admin — Clinic Data Export

- On `app.clinics.index.tsx`, add a **Download** column per clinic → CSV with that clinic's doctors, receptionists, patients counts + rosters.
- Add a **"Download all clinics"** button in the page header → single ZIP-like combined CSV covering every clinic.
- Log each export into Audit Logs.

## 2. Super Admin — Add another Super Admin

- On `app.users.tsx` (Super Admin view), add **"Invite Super Admin"** action (name, email, phone) → adds row with role `super_admin`.

## 3. Clinic Admin — Add another Clinic Admin

- Same page, when role is `clinic_admin`, show **"Invite Clinic Admin"** button scoped to their clinic.

## 4. Appointment form — Real-time default date/time

- `app.appointments.new.tsx`: default `date` = today, `time` = now (rounded to next 5 min). Fields remain editable. Add a small **"Now"** helper button that resets to current timestamp.

## 5. Doctor Role

### 5a. Settings cleanup
- In `app.settings.tsx`, hide "Payment received" and "Subscription expired" notification toggles for `doctor` role — keep them only for `clinic_admin` (and super_admin where relevant).

### 5b. Replace Medical History with Follow-ups
- Remove `Medical History` sidebar item for doctors in `sidebar-nav.tsx`.
- Add **Follow-ups** page (`app.followups.tsx`) listing upcoming follow-up dates pulled from prescriptions, with patient, date, reason, status (Pending/Done), quick actions (Reschedule / Mark done / Open patient).

### 5c. Edit prescription
- `app.prescriptions.index.tsx`: add **Edit** action for doctors → reuses `prescriptions.new` form pre-filled (mode: edit).

### 5d. Patient 360 view
- Enhance `app.patients.$id.tsx` with tabs: **Overview | Prescriptions | Lab Reports | Bills | Appointments | Files**. Each item is viewable inline and downloadable as PDF exactly as created/uploaded.

## 6. Prescription — Lab Report attachments

- On prescription detail (and within `prescriptions.new`), add **"Lab Reports"** section:
  - **Upload** (PDF/image) or **Create** (structured form: test name, values, reference range, notes).
  - Editable by doctor, clinic admin, receptionist.
  - Receptionist is restricted to lab-report add/upload only — no edit to meds, diagnosis, notes.

## 7. Receptionist Role

### 7a. Prescription access
- Sidebar shows Prescriptions (read-only) with **Add Lab Report** button only.

### 7b. Billing improvements (`app.billing.new.tsx`)
- **Import medicines from prescription** picker (select patient → pulls prescription meds into itemized rows).
- Structured itemized bill: rows grouped as **Consultation / Procedure / Medicines / Lab / Other**, each row shows qty × unit price = line total, with running subtotal, discount, tax, grand total — patient-friendly breakdown.
- **Send via WhatsApp** button on bill preview.

## 8. WhatsApp send

- Reusable `sendWhatsApp(phone, message, attachmentLabel)` helper opens `https://wa.me/<phone>?text=<encoded>`.
- Buttons added to: prescription detail/preview, lab report detail, bill preview.

## 9. Download Center (all roles)

- New route `app.downloads.tsx` in sidebar for every role.
- Role-scoped export options with checkboxes:
  - **Super Admin**: any clinic's full data or platform-wide.
  - **Clinic Admin**: full clinic backup (patients, doctors, receptionists, appointments, prescriptions, bills, lab reports, files).
  - **Doctor**: own patients, own prescriptions, own lab reports, own appointments.
  - **Receptionist**: appointments, bills, lab reports uploaded.
- Format toggle: CSV (data) / PDF (documents). Each run adds an Audit Log entry.

## 10. Unified viewer

- Small `<DocumentViewer />` component used across patient tabs, prescriptions, lab reports, bills so items render as they were created/uploaded (PDF iframe for uploads; styled preview for structured records) with **Download** and **Send on WhatsApp** actions.

---

## Technical notes

- New files:
  - `src/routes/app.followups.tsx`
  - `src/routes/app.downloads.tsx`
  - `src/components/documents/document-viewer.tsx`
  - `src/components/lab-reports/lab-report-form.tsx`
  - `src/lib/whatsapp.ts`
  - `src/lib/exporters.ts` (CSV + jsPDF helpers)
- Extend `src/lib/sample-data.ts` with `labReports`, `followUps`, prescription→lab linkage, and richer bill line items.
- Update `src/components/layout/sidebar-nav.tsx` for role-based nav (remove Medical History for doctor, add Follow-ups, add Download Center for all).
- Update `src/routes/app.settings.tsx` to hide payment/subscription notifications for doctors.
- Update `src/routes/app.users.tsx` with role-aware "Invite" actions.
- Update `src/routes/app.clinics.index.tsx` for per-clinic + bulk export.
- Update `src/routes/app.appointments.new.tsx` for live now-defaults + Now button.
- Update `src/routes/app.prescriptions.new.tsx` / index for edit mode + lab report block.
- Update `src/routes/app.billing.new.tsx` for itemized bill + import from prescription + WhatsApp send.
- Update `src/routes/app.patients.$id.tsx` with tabbed patient 360.
- Add `jspdf` dependency for PDF exports.

All state stays client-side using the existing sample-data module; no schema/db work.
