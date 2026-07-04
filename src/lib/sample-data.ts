export const clinics = [
  { id: "CL-001", name: "Northwood Health", city: "Stockholm, SE", doctors: 12, receptionists: 5, patients: 1840, plan: "ClinicFlow", status: "Active", expires: "2026-09-14" },
  { id: "CL-002", name: "Riverside Medical", city: "Toronto, CA", doctors: 8, receptionists: 3, patients: 1210, plan: "ClinicFlow", status: "Active", expires: "2026-08-02" },
  { id: "CL-003", name: "Aurora Family Clinic", city: "Oslo, NO", doctors: 5, receptionists: 2, patients: 620, plan: "ClinicFlow", status: "Active", expires: "2026-07-21" },
  { id: "CL-004", name: "Greenfield Practice", city: "Manchester, UK", doctors: 6, receptionists: 2, patients: 880, plan: "ClinicFlow", status: "Expiring", expires: "2026-06-27" },
  { id: "CL-005", name: "Bayview Wellness", city: "San Diego, US", doctors: 9, receptionists: 4, patients: 1450, plan: "ClinicFlow", status: "Active", expires: "2027-01-10" },
  { id: "CL-006", name: "Heritage Family Care", city: "Dublin, IE", doctors: 4, receptionists: 2, patients: 510, plan: "ClinicFlow", status: "Expired", expires: "2026-05-30" },
];

export const patients = [
  { id: "PT-10293", name: "Liam Andersson", age: 34, gender: "Male", phone: "+46 70 233 4521", lastVisit: "2026-06-12", status: "Follow-up", doctor: "Dr. Amelia Chen" },
  { id: "PT-10294", name: "Emma Bauer", age: 28, gender: "Female", phone: "+49 152 887 4410", lastVisit: "2026-06-15", status: "New", doctor: "Dr. Amelia Chen" },
  { id: "PT-10295", name: "Noah Petersen", age: 41, gender: "Male", phone: "+45 28 117 990", lastVisit: "2026-06-10", status: "Active", doctor: "Dr. Rahul Mehta" },
  { id: "PT-10296", name: "Sophia Romano", age: 52, gender: "Female", phone: "+39 320 998 7110", lastVisit: "2026-06-08", status: "Active", doctor: "Dr. Amelia Chen" },
  { id: "PT-10297", name: "Mateo Hernández", age: 19, gender: "Male", phone: "+34 612 884 220", lastVisit: "2026-06-14", status: "New", doctor: "Dr. Rahul Mehta" },
  { id: "PT-10298", name: "Olivia Kowalski", age: 67, gender: "Female", phone: "+48 501 220 887", lastVisit: "2026-06-02", status: "Follow-up", doctor: "Dr. Amelia Chen" },
  { id: "PT-10299", name: "Henry Ferreira", age: 45, gender: "Male", phone: "+351 962 117 880", lastVisit: "2026-06-13", status: "Active", doctor: "Dr. Rahul Mehta" },
  { id: "PT-10300", name: "Mia Johansson", age: 30, gender: "Female", phone: "+46 70 998 1124", lastVisit: "2026-06-16", status: "Active", doctor: "Dr. Amelia Chen" },
];

export const appointments = [
  { id: "AP-5521", patient: "Liam Andersson", patientId: "PT-10293", doctor: "Dr. Amelia Chen", time: "09:00", date: "2026-06-20", type: "Consultation", status: "Confirmed" },
  { id: "AP-5522", patient: "Emma Bauer", patientId: "PT-10294", doctor: "Dr. Amelia Chen", time: "09:30", date: "2026-06-20", type: "Follow-up", status: "Confirmed" },
  { id: "AP-5523", patient: "Mateo Hernández", patientId: "PT-10297", doctor: "Dr. Rahul Mehta", time: "10:15", date: "2026-06-20", type: "Consultation", status: "Checked-in" },
  { id: "AP-5524", patient: "Sophia Romano", patientId: "PT-10296", doctor: "Dr. Amelia Chen", time: "11:00", date: "2026-06-20", type: "Check-up", status: "Pending" },
  { id: "AP-5525", patient: "Olivia Kowalski", patientId: "PT-10298", doctor: "Dr. Amelia Chen", time: "13:30", date: "2026-06-20", type: "Follow-up", status: "Confirmed" },
  { id: "AP-5526", patient: "Noah Petersen", patientId: "PT-10295", doctor: "Dr. Rahul Mehta", time: "14:45", date: "2026-06-21", type: "Consultation", status: "Confirmed" },
  { id: "AP-5527", patient: "Mia Johansson", patientId: "PT-10300", doctor: "Dr. Amelia Chen", time: "15:30", date: "2026-06-21", type: "Consultation", status: "Confirmed" },
];

export const doctors = [
  { id: "DR-01", name: "Dr. Amelia Chen", specialty: "General Medicine", patients: 412, status: "Active", email: "amelia.chen@northwood.health", phone: "+46 70 884 1100" },
  { id: "DR-02", name: "Dr. Rahul Mehta", specialty: "Cardiology", patients: 287, status: "Active", email: "rahul.mehta@northwood.health", phone: "+46 70 884 1101" },
  { id: "DR-03", name: "Dr. Ingrid Larsson", specialty: "Pediatrics", patients: 356, status: "Active", email: "ingrid.larsson@northwood.health", phone: "+46 70 884 1102" },
  { id: "DR-04", name: "Dr. Tomás Silva", specialty: "Dermatology", patients: 198, status: "On Leave", email: "tomas.silva@northwood.health", phone: "+46 70 884 1103" },
  { id: "DR-05", name: "Dr. Aisha Khan", specialty: "Endocrinology", patients: 221, status: "Active", email: "aisha.khan@northwood.health", phone: "+46 70 884 1104" },
];

export const receptionists = [
  { id: "RC-01", name: "Sofia Romero", email: "sofia@northwood.health", phone: "+46 70 884 2210", shift: "Morning", status: "Active" },
  { id: "RC-02", name: "Jonas Berg", email: "jonas@northwood.health", phone: "+46 70 117 3322", shift: "Evening", status: "Active" },
  { id: "RC-03", name: "Lena Fischer", email: "lena@northwood.health", phone: "+46 70 552 9981", shift: "Morning", status: "Active" },
];

export const bills = [
  { id: "INV-2026-0412", patient: "Liam Andersson", date: "2026-06-12", amount: 145.0, status: "Paid", method: "Card" },
  { id: "INV-2026-0413", patient: "Emma Bauer", date: "2026-06-15", amount: 89.5, status: "Paid", method: "Card" },
  { id: "INV-2026-0414", patient: "Sophia Romano", date: "2026-06-08", amount: 230.0, status: "Pending", method: "—" },
  { id: "INV-2026-0415", patient: "Mateo Hernández", date: "2026-06-14", amount: 60.0, status: "Paid", method: "Cash" },
  { id: "INV-2026-0416", patient: "Olivia Kowalski", date: "2026-06-02", amount: 175.0, status: "Overdue", method: "—" },
];

export type PrescriptionMed = { name: string; dosage: string; frequency: string; duration: string; unitPrice?: number };
export type Prescription = {
  id: string; patient: string; patientId: string; doctor: string; date: string;
  diagnosis: string; notes?: string; followUp?: string; medicines: PrescriptionMed[];
};

export const prescriptions: Prescription[] = [
  { id: "RX-9821", patient: "Liam Andersson", patientId: "PT-10293", doctor: "Dr. Amelia Chen", date: "2026-06-12", diagnosis: "Seasonal allergic rhinitis", notes: "Rest and hydration.", followUp: "2026-06-26",
    medicines: [
      { name: "Cetirizine 10mg", dosage: "1 tab", frequency: "1× per day", duration: "7 days", unitPrice: 45 },
      { name: "Fluticasone nasal spray", dosage: "2 puffs", frequency: "1× per day", duration: "14 days", unitPrice: 320 },
      { name: "Montelukast 10mg", dosage: "1 tab", frequency: "1× per day", duration: "10 days", unitPrice: 180 },
    ] },
  { id: "RX-9822", patient: "Emma Bauer", patientId: "PT-10294", doctor: "Dr. Amelia Chen", date: "2026-06-15", diagnosis: "Mild iron-deficiency anemia", followUp: "2026-07-15",
    medicines: [
      { name: "Ferrous sulphate 200mg", dosage: "1 tab", frequency: "2× per day", duration: "30 days", unitPrice: 60 },
      { name: "Vitamin C 500mg", dosage: "1 tab", frequency: "1× per day", duration: "30 days", unitPrice: 85 },
    ] },
  { id: "RX-9823", patient: "Sophia Romano", patientId: "PT-10296", doctor: "Dr. Amelia Chen", date: "2026-06-08", diagnosis: "Hypertension stage 1", followUp: "2026-07-08",
    medicines: [
      { name: "Amlodipine 5mg", dosage: "1 tab", frequency: "1× per day", duration: "30 days", unitPrice: 90 },
      { name: "Losartan 50mg", dosage: "1 tab", frequency: "1× per day", duration: "30 days", unitPrice: 110 },
    ] },
  { id: "RX-9824", patient: "Mateo Hernández", patientId: "PT-10297", doctor: "Dr. Rahul Mehta", date: "2026-06-14", diagnosis: "Acute pharyngitis", followUp: "2026-06-21",
    medicines: [
      { name: "Amoxicillin 500mg", dosage: "1 cap", frequency: "3× per day", duration: "5 days", unitPrice: 55 },
      { name: "Paracetamol 500mg", dosage: "1 tab", frequency: "3× per day", duration: "5 days", unitPrice: 20 },
      { name: "Betadine gargle", dosage: "15 ml", frequency: "3× per day", duration: "5 days", unitPrice: 95 },
    ] },
];

export type LabReport = {
  id: string; prescriptionId?: string; patient: string; patientId: string;
  test: string; date: string; result: string; reference: string; notes?: string;
  fileName?: string; uploadedBy: string;
};

export const labReports: LabReport[] = [
  { id: "LR-2201", prescriptionId: "RX-9822", patient: "Emma Bauer", patientId: "PT-10294", test: "Complete Blood Count", date: "2026-06-15", result: "Hb 10.2 g/dL", reference: "12.0 – 15.5 g/dL", notes: "Low Hb — iron supplementation started.", uploadedBy: "Sofia Romero" },
  { id: "LR-2202", prescriptionId: "RX-9823", patient: "Sophia Romano", patientId: "PT-10296", test: "Lipid Profile", date: "2026-06-08", result: "LDL 148 mg/dL", reference: "< 130 mg/dL", notes: "Borderline high.", uploadedBy: "Dr. Amelia Chen" },
  { id: "LR-2203", prescriptionId: "RX-9821", patient: "Liam Andersson", patientId: "PT-10293", test: "Allergy Panel IgE", date: "2026-06-12", result: "Pollen +++, Dust ++", reference: "Negative", fileName: "allergy-panel.pdf", uploadedBy: "Sofia Romero" },
];

export type FollowUp = {
  id: string; patient: string; patientId: string; doctor: string;
  date: string; reason: string; status: "Pending" | "Done" | "Rescheduled";
};

export const followUps: FollowUp[] = prescriptions
  .filter(p => p.followUp)
  .map((p, i) => ({
    id: `FU-${400 + i}`,
    patient: p.patient, patientId: p.patientId, doctor: p.doctor,
    date: p.followUp!, reason: p.diagnosis,
    status: (i === 1 ? "Done" : "Pending") as "Pending" | "Done",
  }));

export const SUBSCRIPTION_PRICE = 499; // ₹ per clinic per month

export const subscriptions = [
  { clinic: "Northwood Health", price: SUBSCRIPTION_PRICE, renews: "2026-09-14", status: "Active", daysLeft: 86 },
  { clinic: "Riverside Medical", price: SUBSCRIPTION_PRICE, renews: "2026-08-02", status: "Active", daysLeft: 43 },
  { clinic: "Aurora Family Clinic", price: SUBSCRIPTION_PRICE, renews: "2026-07-21", status: "Active", daysLeft: 31 },
  { clinic: "Greenfield Practice", price: SUBSCRIPTION_PRICE, renews: "2026-06-27", status: "Expiring", daysLeft: 7 },
  { clinic: "Bayview Wellness", price: SUBSCRIPTION_PRICE, renews: "2027-01-10", status: "Active", daysLeft: 204 },
  { clinic: "Heritage Family Care", price: SUBSCRIPTION_PRICE, renews: "2026-05-30", status: "Expired", daysLeft: -21 },
];

export const payments = [
  { id: "PAY-30021", clinic: "Northwood Health", method: "UPI", amount: SUBSCRIPTION_PRICE, txn: "UPI8829110", date: "2026-06-14", status: "Verified" },
  { id: "PAY-30022", clinic: "Aurora Family Clinic", method: "Google Pay", amount: SUBSCRIPTION_PRICE, txn: "GPAY772A11", date: "2026-06-15", status: "Pending" },
  { id: "PAY-30023", clinic: "Greenfield Practice", method: "PhonePe", amount: SUBSCRIPTION_PRICE, txn: "PP-991023", date: "2026-06-16", status: "Pending" },
  { id: "PAY-30024", clinic: "Bayview Wellness", method: "Bank Transfer", amount: SUBSCRIPTION_PRICE, txn: "TXN8830221", date: "2026-06-12", status: "Verified" },
];

export const revenueByMonth = [
  { month: "Jan", revenue: 21400 }, { month: "Feb", revenue: 24800 }, { month: "Mar", revenue: 26900 },
  { month: "Apr", revenue: 28500 }, { month: "May", revenue: 31200 }, { month: "Jun", revenue: 34750 },
];

export const visitsByWeek = [
  { day: "Mon", visits: 42 }, { day: "Tue", visits: 51 }, { day: "Wed", visits: 47 },
  { day: "Thu", visits: 58 }, { day: "Fri", visits: 63 }, { day: "Sat", visits: 38 }, { day: "Sun", visits: 12 },
];

export const auditLogs = [
  { user: "Sofia Romero", action: "Created appointment AP-5527", date: "2026-06-19", time: "16:42" },
  { user: "Dr. Amelia Chen", action: "Signed prescription RX-9822", date: "2026-06-15", time: "11:08" },
  { user: "Marcus Lindqvist", action: "Added new doctor DR-05", date: "2026-06-14", time: "09:31" },
  { user: "Sofia Romero", action: "Registered patient PT-10300", date: "2026-06-16", time: "10:15" },
  { user: "Dr. Rahul Mehta", action: "Updated medical record PT-10295", date: "2026-06-13", time: "14:22" },
  { user: "Helena Vance", action: "Verified payment PAY-30021", date: "2026-06-14", time: "08:55" },
];

export const notifications = [
  { type: "warning", title: "Greenfield Practice subscription expires in 7 days", time: "2h ago" },
  { type: "destructive", title: "Heritage Family Care subscription expired", time: "1d ago" },
  { type: "info", title: "Payment verification: Aurora Family Clinic (₹499)", time: "3h ago" },
  { type: "info", title: "Payment verification: Greenfield Practice (₹499)", time: "5h ago" },
  { type: "success", title: "Bayview Wellness renewed plan", time: "Yesterday" },
];
