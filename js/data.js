// ============================================
// DATA LAYER — now talking to the real PHP backend.
// Every function that touches applications is async
// (it's a network call now, not localStorage).
// ============================================

const APPLICATIONS_API = 'backend/applications';

async function getApplications() {
  try {
    const res = await fetch(`${APPLICATIONS_API}/list.php`);
    const data = await res.json();
    if (!data.success) return [];
    return data.applications;
  } catch (err) {
    console.error('Failed to load applications:', err);
    return [];
  }
}

async function getApplicationById(id) {
  const apps = await getApplications();
  return apps.find((a) => String(a.id) === String(id));
}

async function addApplication(appData) {
  const res = await fetch(`${APPLICATIONS_API}/add.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appData),
  });
  return res.json();
}

async function updateApplication(id, updates) {
  const res = await fetch(`${APPLICATIONS_API}/update.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
  return res.json();
}

// ---------- USER (real backend now) ----------

const PROFILE_API = 'backend/profile';

async function getUser() {
  try {
    const res = await fetch(`${PROFILE_API}/get.php`);
    const data = await res.json();
    if (!data.success) return null;
    return data.user;
  } catch (err) {
    console.error('Failed to load profile:', err);
    return null;
  }
}

async function saveUser(updates) {
  const res = await fetch(`${PROFILE_API}/update.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return res.json();
}

// ---------- SHARED HELPERS ----------

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
