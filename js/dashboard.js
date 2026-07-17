document.addEventListener('DOMContentLoaded', () => {
  const apps = getApplications();

  // ---- Stats ----
  const total = apps.length;
  const interviews = apps.filter((a) => a.status === 'Interview').length;
  const offers = apps.filter((a) => a.status === 'Offer').length;
  const rejections = apps.filter((a) => a.status === 'Rejected').length;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-interviews').textContent = interviews;
  document.getElementById('stat-offers').textContent = offers;
  document.getElementById('stat-rejections').textContent = rejections;

  // ---- Recent 5 (most recently applied first) ----
  const recent = [...apps]
    .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
    .slice(0, 5);

  const tbody = document.getElementById('recent-apps-body');

  if (recent.length === 0) {
    document.getElementById('recent-empty').style.display = 'block';
    document.getElementById('recent-table-wrap').style.display = 'none';
    return;
  }

  tbody.innerHTML = recent.map((app) => `
    <tr style="cursor:default;">
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
    </tr>
  `).join('');
});
