// ============================================
// DATA LAYER — mock only for now.
// Swap getApplications/saveApplications internals
// for real fetch() calls to the PHP API later —
// every page that consumes this data stays unchanged.
// ============================================

const STORAGE_KEY = 'ascend_applications_v2';

const SEED_APPLICATIONS = [
  { id: 1,  company: 'Rippling',        role: 'SDE Intern',                 location: 'Bengaluru',   jobType: 'Internship', mode: 'Off-Campus', status: 'Interview', dateApplied: '2026-07-08', jobLink: 'https://rippling.com/careers', notes: 'Offline round, hidden test cases — revise DP before this one.', referral: false },
  { id: 2,  company: 'PhonePe',          role: 'SDE-1',                       location: 'Bengaluru',   jobType: 'Full-time',   mode: 'Off-Campus', status: 'OA',         dateApplied: '2026-07-05', jobLink: 'https://phonepe.com/careers', notes: '', referral: false },
  { id: 3,  company: 'SAP Labs',         role: 'Software Engineer Intern',   location: 'Bengaluru',   jobType: 'Internship', mode: 'On-Campus',  status: 'Applied',    dateApplied: '2026-07-02', jobLink: 'https://sap.com/careers', notes: 'Referred by a senior — mentioned they focus a lot on OOP basics.', referral: true },
  { id: 4,  company: 'Amex',             role: 'Technology Analyst',          location: 'Gurugram',    jobType: 'Full-time',   mode: 'On-Campus',  status: 'Wishlist',   dateApplied: '2026-06-29', jobLink: 'https://americanexpress.com/careers', notes: '', referral: false },
  { id: 5,  company: 'JPMorgan Chase',   role: 'Software Engineer Intern',   location: 'Mumbai',      jobType: 'Internship', mode: 'On-Campus',  status: 'Applied',    dateApplied: '2026-06-27', jobLink: 'https://jpmorganchase.com/careers', notes: '', referral: false },
  { id: 6,  company: 'Zscaler',          role: 'SDE Intern',                 location: 'Bengaluru',   jobType: 'Internship', mode: 'Off-Campus', status: 'Rejected',   dateApplied: '2026-06-20', jobLink: 'https://zscaler.com/careers', notes: 'OA had 3 hard DSA questions, didn\'t clear the cutoff.', referral: false },
  { id: 7,  company: 'Sprinklr',         role: 'SDE-1',                       location: 'Gurugram',    jobType: 'Full-time',   mode: 'Off-Campus', status: 'OA',         dateApplied: '2026-06-18', jobLink: 'https://sprinklr.com/careers', notes: '', referral: false },
  { id: 8,  company: 'Barclays',         role: 'Technology Analyst',          location: 'Pune',        jobType: 'Full-time',   mode: 'On-Campus',  status: 'Wishlist',   dateApplied: '2026-06-15', jobLink: 'https://barclays.com/careers', notes: '', referral: false },
  { id: 9,  company: 'Deutsche Bank',    role: 'Analyst Intern',              location: 'Pune',        jobType: 'Internship', mode: 'On-Campus',  status: 'Applied',    dateApplied: '2026-06-12', jobLink: 'https://db.com/careers', notes: '', referral: false },
  { id: 10, company: 'Flipkart',         role: 'SDE Intern',                 location: 'Bengaluru',   jobType: 'Internship', mode: 'Off-Campus', status: 'Offer',      dateApplied: '2026-06-01', jobLink: 'https://flipkart.com/careers', notes: 'Got the offer! Onsite process, 3 rounds — DSA + LLD + HM round.', referral: true },
  { id: 11, company: 'NatWest',          role: 'Software Engineer',           location: 'Gurugram',    jobType: 'Full-time',   mode: 'On-Campus',  status: 'Applied',    dateApplied: '2026-05-28', jobLink: 'https://natwestgroup.com/careers', notes: '', referral: false },
  { id: 12, company: 'Visa',             role: 'SDE Intern',                 location: 'Bengaluru',   jobType: 'Internship', mode: 'Off-Campus', status: 'Rejected',   dateApplied: '2026-05-20', jobLink: 'https://visa.com/careers', notes: '', referral: false },
  { id: 13, company: 'UBS',              role: 'Technology Analyst',          location: 'Pune',        jobType: 'Full-time',   mode: 'Off-Campus', status: 'Wishlist',   dateApplied: '2026-05-15', jobLink: 'https://ubs.com/careers', notes: '', referral: false },
  { id: 14, company: 'InfoEdge',         role: 'SDE Intern',                 location: 'Noida',       jobType: 'Internship', mode: 'Off-Campus', status: 'Interview',  dateApplied: '2026-05-10', jobLink: 'https://infoedge.com/careers', notes: 'Two rounds done, waiting on the HM round.', referral: false },
];

function getApplications() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_APPLICATIONS));
    return [...SEED_APPLICATIONS];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_APPLICATIONS));
    return [...SEED_APPLICATIONS];
  }
}

function saveApplications(apps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

function getApplicationById(id) {
  return getApplications().find((a) => String(a.id) === String(id));
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function formatDate(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

function statusBadgeClass(status) {
  const map = {
    Wishlist: 'badge-wishlist',
    Applied: 'badge-applied',
    OA: 'badge-oa',
    Interview: 'badge-interview',
    Offer: 'badge-offer',
    Rejected: 'badge-rejected',
  };
  return map[status] || 'badge-wishlist';
}
