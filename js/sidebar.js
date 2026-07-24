// ============================================
// SIDEBAR — logout confirmation
// Include this on every page that has the sidebar.
// Any element with [data-logout] will trigger the modal.
// ============================================

function initLogoutConfirm() {
  if (document.getElementById('logout-confirm-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'logout-confirm-overlay';
  overlay.innerHTML = `
    <div class="confirm-modal">
      <div class="confirm-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
      </div>
      <h3>Log out?</h3>
      <p>You'll need to sign in again to access your applications.</p>
      <div class="confirm-actions">
        <button class="btn btn-secondary" id="logout-cancel-btn">Cancel</button>
        <button class="btn btn-danger-solid" id="logout-confirm-btn">Logout</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const closeModal = () => overlay.classList.remove('open');
  const openModal = () => overlay.classList.add('open');

  document.getElementById('logout-cancel-btn').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  document.getElementById('logout-confirm-btn').addEventListener('click', async () => {
    try {
      await fetch('backend/auth/logout.php', { method: 'POST' });
    } catch (err) {
      // even if the request fails, still send them to login
    }
    window.location.href = 'login.html';
  });

  document.querySelectorAll('[data-logout]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
}

document.addEventListener('DOMContentLoaded', initLogoutConfirm);
