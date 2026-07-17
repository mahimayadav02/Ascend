let currentFilter = 'all';
let currentSearch = '';

function renderApplicationsTable() {
  const apps = getApplications();

  const filtered = apps
    .filter((a) => currentFilter === 'all' || a.status === currentFilter)
    .filter((a) => a.company.toLowerCase().includes(currentSearch.trim().toLowerCase()))
    .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));

  const tbody = document.getElementById('applications-body');
  const emptyState = document.getElementById('applications-empty');
  const tableWrap = document.getElementById('applications-table-wrap');
  const countLabel = document.getElementById('results-count');

  countLabel.textContent = `${filtered.length} of ${apps.length}`;

  if (filtered.length === 0) {
    tableWrap.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  tableWrap.style.display = '';
  emptyState.style.display = 'none';

  tbody.innerHTML = filtered.map((app) => `
    <tr>
      <td>
        <div class="company-cell">
          <div class="company-logo">${getInitials(app.company)}</div>
          <div>
            <div class="company-name">${app.company}</div>
            <div class="role-sub">${app.role}</div>
          </div>
        </div>
      </td>
      <td><span class="badge ${statusBadgeClass(app.status)}">${app.status}</span></td>
      <td><span class="tag">${app.jobType}</span></td>
      <td><span class="tag">${app.mode}</span></td>
      <td class="mono text-secondary">${formatDate(app.dateApplied)}</td>
      <td class="notes-cell">
        <div class="tooltip-wrap" tabindex="0">
          <button class="notes-icon ${app.notes ? 'has-note' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          </button>
          <div class="tooltip-bubble align-right">${app.notes ? app.notes : 'No notes added yet.'}</div>
        </div>
      </td>
      <td class="actions-cell">
        <button class="notes-icon" title="Edit" onclick="openApplicationForm('edit', ${app.id});">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

window.onApplicationSaved = renderApplicationsTable;

document.addEventListener('DOMContentLoaded', () => {
  renderApplicationsTable();

  document.getElementById('search-input').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderApplicationsTable();
  });

  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.status;
      renderApplicationsTable();
    });
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('action') === 'add') {
    openApplicationForm('add');
  }
});
