// ============================================================
// DEMO MODE - Mock Data for Vercel Deployment (No Backend)
// All API calls are replaced with this static data
// ============================================================

export const DEMO_MODE = true;

export const DEMO_ROLE = 'senior'; // Logged in as Senior Advocate (NLK Sir)

// ---- CASES ----
export const MOCK_CASES = [
  {
    _id: 'case001',
    caseId: 'NLK-2026-00001',
    bank: 'ICICI Bank',
    status: 'approved',
    createdAt: '2026-04-10T09:00:00Z',
    updatedAt: '2026-05-01T12:00:00Z',
    clientId: { name: 'Rajesh Sharma', phone: '9876543210', email: 'rajesh@gmail.com', address: 'Flat 4B, Sai Nagar, Pune' },
    propertyId: { address: 'Plot No. 45, Baner Road, Pune', surveyNo: 'SRV/2024/1234', village: 'Baner', taluka: 'Haveli', district: 'Pune' },
    assignedTo: 'Adv. Priya Kulkarni',
  },
  {
    _id: 'case002',
    caseId: 'NLK-2026-00002',
    bank: 'ICICI Bank',
    status: 'under_review',
    createdAt: '2026-04-15T10:00:00Z',
    updatedAt: '2026-05-05T09:00:00Z',
    clientId: { name: 'Sunita Desai', phone: '9812345678', email: 'sunita.d@yahoo.com', address: '12, Shivaji Colony, Nashik' },
    propertyId: { address: 'Gat No. 78, Dindori Road, Nashik', surveyNo: 'SRV/2024/5678', village: 'Dindori', taluka: 'Dindori', district: 'Nashik' },
    assignedTo: 'Adv. Arun Patil',
  },
  {
    _id: 'case003',
    caseId: 'NLK-2026-00003',
    bank: 'Aditya Birla',
    status: 'draft_ready',
    createdAt: '2026-04-20T11:00:00Z',
    updatedAt: '2026-05-08T14:00:00Z',
    clientId: { name: 'Vikram Joshi', phone: '9765432100', email: 'vikramj@hotmail.com', address: 'C-17, NIBM Road, Pune' },
    propertyId: { address: 'CTS No. 290/A, Kondhwa, Pune', surveyNo: 'SRV/2024/9012', village: 'Kondhwa', taluka: 'Haveli', district: 'Pune' },
    assignedTo: 'Adv. Priya Kulkarni',
  },
  {
    _id: 'case004',
    caseId: 'NLK-2026-00004',
    bank: 'Bajaj Finserv',
    status: 'in_progress',
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-10T10:00:00Z',
    clientId: { name: 'Meera Nair', phone: '9901234567', email: 'meeranair@gmail.com', address: '88, MG Road, Nagpur' },
    propertyId: { address: 'Survey No. 112, Hingna Road, Nagpur', surveyNo: 'SRV/2025/1122', village: 'Hingna', taluka: 'Nagpur', district: 'Nagpur' },
    assignedTo: 'Adv. Rohan Sane',
  },
  {
    _id: 'case005',
    caseId: 'NLK-2026-00005',
    bank: 'ICICI Bank',
    status: 'shared_to_bank',
    createdAt: '2026-03-25T12:00:00Z',
    updatedAt: '2026-04-30T16:00:00Z',
    clientId: { name: 'Anand Kulkarni', phone: '9823456781', email: 'anand.k@gmail.com', address: '23, Deccan Gymkhana, Pune' },
    propertyId: { address: 'CTS No. 56/B, FC Road, Pune', surveyNo: 'SRV/2024/3333', village: 'Shivajinagar', taluka: 'Haveli', district: 'Pune' },
    assignedTo: 'Adv. Priya Kulkarni',
  },
  {
    _id: 'case006',
    caseId: 'NLK-2026-00006',
    bank: 'Aditya Birla',
    status: 'assigned',
    createdAt: '2026-05-10T09:00:00Z',
    updatedAt: '2026-05-10T09:00:00Z',
    clientId: { name: 'Pradeep Bhosale', phone: '9654321098', email: 'pradeepb@gmail.com', address: 'Flat 7A, Kothrud, Pune' },
    propertyId: { address: 'Plot No. 23, Karve Nagar, Pune', surveyNo: 'SRV/2025/4444', village: 'Kothrud', taluka: 'Haveli', district: 'Pune' },
    assignedTo: 'Adv. Arun Patil',
  },
  {
    _id: 'case007',
    caseId: 'NLK-2026-00007',
    bank: 'Bajaj Finserv',
    status: 'created',
    createdAt: '2026-05-12T14:00:00Z',
    updatedAt: '2026-05-12T14:00:00Z',
    clientId: { name: 'Kavita Reddy', phone: '9738291045', email: 'kavita.r@outlook.com', address: '45, HSR Layout, Bangalore' },
    propertyId: { address: 'Sy No. 203, Whitefield, Bangalore', surveyNo: 'SRV/2025/7788', village: 'Whitefield', taluka: 'KR Puram', district: 'Bangalore Urban' },
    assignedTo: null,
  },
  {
    _id: 'case008',
    caseId: 'NLK-2026-00008',
    bank: 'Aditya Birla',
    status: 'approved',
    createdAt: '2026-04-05T10:00:00Z',
    updatedAt: '2026-05-02T11:00:00Z',
    clientId: { name: 'Suresh Mehta', phone: '9812098120', email: 'suresh.m@gmail.com', address: '1, Marine Drive, Mumbai' },
    propertyId: { address: 'CTS No. 1234, Bandra (W), Mumbai', surveyNo: 'SRV/2024/8800', village: 'Bandra', taluka: 'Andheri', district: 'Mumbai Suburban' },
    assignedTo: 'Adv. Rohan Sane',
  },
];

// ---- DASHBOARD STATS ----
export const MOCK_DASHBOARD = {
  stats: {
    totalCases: 8,
    pendingApproval: 2,
    approvedToday: 1,
    activeBanks: 3,
  },
  bankStats: [
    { _id: 'ICICI Bank', count: 3 },
    { _id: 'Aditya Birla', count: 3 },
    { _id: 'Bajaj Finserv', count: 2 },
  ],
  statusStats: [
    { _id: 'created', count: 1 },
    { _id: 'assigned', count: 1 },
    { _id: 'in_progress', count: 1 },
    { _id: 'draft_ready', count: 1 },
    { _id: 'under_review', count: 1 },
    { _id: 'approved', count: 2 },
    { _id: 'shared_to_bank', count: 1 },
  ],
  recentCases: MOCK_CASES.slice(0, 5),
};

// ---- TSR REPORTS (for Approvals) ----
export const MOCK_TSR_PENDING = [
  {
    _id: 'tsr001',
    caseId: {
      _id: 'case002',
      caseId: 'NLK-2026-00002',
      bank: 'ICICI Bank',
      clientId: { name: 'Sunita Desai' },
    },
    status: 'submitted',
    version: 1,
    createdAt: '2026-05-08T10:00:00Z',
    draftContent: `TITLE SEARCH REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. REPORT PARTICULARS
   Case ID         : NLK-2026-00002
   Client Name     : Sunita Desai
   Bank            : ICICI Bank
   Report Prepared By: NLK Associates
   Date of Report  : 08-May-2026

2. PROPERTY DESCRIPTION
   Survey No.      : SRV/2024/5678
   Address         : Gat No. 78, Dindori Road, Nashik
   Village         : Dindori
   Taluka          : Dindori
   District        : Nashik
   Area            : 2400 Sq. Ft.

3. OWNERSHIP HISTORY (Last 30 Years)
   • 1994 – Registered in name of Shri. Balasaheb More (Sale Deed, Regn. No. 4521)
   • 2007 – Transferred to Smt. Leela More (Gift Deed, Regn. No. 7834)
   • 2018 – Sold to Sunita Desai (Sale Deed, Regn. No. 12234)
   • No disputed ownership chain noted.

4. ENCUMBRANCES & CHARGES
   • No encumbrances found in the search period.
   • Property is free from any registered mortgages.
   • EC Certificate obtained for 30 years from Sub-Registrar, Dindori.

5. LEGAL OBSERVATIONS
   • Title documents found to be in order.
   • Mutation in Revenue records completed.
   • No stay, injunction or court attachment found.
   • NA permission obtained vide order dated 12-Jan-2018.

6. TITLE OPINION
   The title of the subject property is CLEAR and MARKETABLE. 
   It is hereby opined that the property is fit for mortgage 
   purposes in favor of ICICI Bank. All documents are in order 
   and no legal impediment has been found.

Signed & Sealed,
NLK Associates — Advocates & Legal Consultants
`,
  },
  {
    _id: 'tsr002',
    caseId: {
      _id: 'case003',
      caseId: 'NLK-2026-00003',
      bank: 'Aditya Birla',
      clientId: { name: 'Vikram Joshi' },
    },
    status: 'submitted',
    version: 2,
    createdAt: '2026-05-10T14:00:00Z',
    draftContent: `TITLE SEARCH REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. REPORT PARTICULARS
   Case ID         : NLK-2026-00003
   Client Name     : Vikram Joshi
   Bank            : Aditya Birla Finance
   Report Prepared By: NLK Associates
   Date of Report  : 10-May-2026

2. PROPERTY DESCRIPTION
   CTS No.         : 290/A
   Address         : Kondhwa, Pune
   Village         : Kondhwa
   Taluka          : Haveli
   District        : Pune
   Area            : 1800 Sq. Ft.

3. OWNERSHIP HISTORY (Last 30 Years)
   • 1998 – Purchased by Rajendra Joshi (Sale Deed)
   • 2022 – Gifted to son Vikram Joshi (Gift Deed)

4. ENCUMBRANCES & CHARGES
   • No existing charge or lien found.

5. LEGAL OBSERVATIONS
   • All documents submitted and verified.
   • Property tax paid up to date.

6. TITLE OPINION
   Title is CLEAR. Property is fit for mortgage with Aditya Birla Finance.

Signed & Sealed,
NLK Associates — Advocates & Legal Consultants
`,
  },
];

// ---- DOCUMENTS (for Case Detail) ----
export const MOCK_DOCUMENTS = {
  case001: [
    { _id: 'd1', originalName: 'Sale_Deed_2018.pdf', docType: 'Sale Deed', fileSize: 245760, filePath: '' },
    { _id: 'd2', originalName: 'EC_Certificate_30yr.pdf', docType: 'Search Receipt', fileSize: 102400, filePath: '' },
    { _id: 'd3', originalName: 'Tax_Receipt_2025.pdf', docType: 'Tax Receipt', fileSize: 51200, filePath: '' },
  ],
  case002: [
    { _id: 'd4', originalName: 'Agreement_to_Sale.pdf', docType: 'Agreement', fileSize: 307200, filePath: '' },
    { _id: 'd5', originalName: 'GRAS_Challan.pdf', docType: 'GRAS Challan', fileSize: 76800, filePath: '' },
  ],
  case003: [
    { _id: 'd6', originalName: 'Gift_Deed_2022.pdf', docType: 'Sale Deed', fileSize: 204800, filePath: '' },
  ],
};

// ---- TSR FOR A SPECIFIC CASE ----
export const MOCK_TSR_BY_CASE = {
  case001: {
    _id: 'tsr_c001',
    caseId: 'case001',
    status: 'approved',
    version: 1,
    draftContent: MOCK_TSR_PENDING[0].draftContent,
    createdAt: '2026-05-01T10:00:00Z',
  },
  case002: {
    _id: 'tsr001',
    caseId: 'case002',
    status: 'submitted',
    version: 1,
    draftContent: MOCK_TSR_PENDING[0].draftContent,
    createdAt: '2026-05-08T10:00:00Z',
  },
  case003: {
    _id: 'tsr002',
    caseId: 'case003',
    status: 'draft',
    version: 2,
    draftContent: MOCK_TSR_PENDING[1].draftContent,
    createdAt: '2026-05-10T14:00:00Z',
  },
};
