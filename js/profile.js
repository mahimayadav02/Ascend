function renderProfileView() {
  const user = getUser();
  const apps = getApplications();

  document.getElementById('profile-avatar').textContent = getInitials(user.name);
  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-email').textContent = user.personalEmail;
  document.getElementById('profile-joined').textContent = `Member since ${formatDate(user.joined)}`;

  document.getElementById('d-status').textContent = user.status;
  document.getElementById('d-college').textContent = user.college || '—';
  document.getElementById('d-branch').textContent = user.branch || '—';
  document.getElementById('d-experience').textContent = user.experience || '—';
  document.getElementById('d-personal-email').textContent = user.personalEmail || '—';
  document.getElementById('d-college-email').textContent = user.collegeWorkEmail || '—';

  document.getElementById('profile-total').textContent = apps.length;
  document.getElementById('profile-interviews').textContent = apps.filter((a) => a.status === 'Interview').length;
  document.getElementById('profile-offers').textContent = apps.filter((a) => a.status === 'Offer').length;
}

function enterEditMode() {
  const user = getUser();
  document.getElementById('e-name').value = user.name;
  document.getElementById('e-college').value = user.college || '';
  document.getElementById('e-branch').value = user.branch || '';
  document.getElementById('e-experience').value = user.experience || '';
  document.getElementById('e-personal-email').value = user.personalEmail || '';
  document.getElementById('e-college-email').value = user.collegeWorkEmail || '';
  setToggleGroup('status-group', user.status);

  document.getElementById('profile-view-mode').style.display = 'none';
  document.getElementById('profile-edit-mode').style.display = 'block';
}

function exitEditMode() {
  document.getElementById('profile-edit-mode').style.display = 'none';
  document.getElementById('profile-view-mode').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  renderProfileView();

  document.getElementById('edit-trigger-btn').addEventListener('click', enterEditMode);
  document.getElementById('cancel-edit-btn').addEventListener('click', exitEditMode);

  document.getElementById('profile-edit-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('e-name');
    if (!name.value.trim()) {
      name.classList.add('error');
      return;
    }
    name.classList.remove('error');

    const updatedUser = {
      ...getUser(),
      name: name.value.trim(),
      college: document.getElementById('e-college').value.trim(),
      branch: document.getElementById('e-branch').value.trim(),
      experience: document.getElementById('e-experience').value.trim(),
      personalEmail: document.getElementById('e-personal-email').value.trim(),
      collegeWorkEmail: document.getElementById('e-college-email').value.trim(),
      status: getToggleGroupValue('status-group') || 'Student',
    };

    saveUser(updatedUser);
    renderProfileView();
    exitEditMode();
  });
});

// Toggle group click delegation (shared pattern with application-form.js,
// duplicated here since this page doesn't load that file)
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle-option')) {
    const group = e.target.closest('.toggle-group');
    group.querySelectorAll('.toggle-option').forEach((o) => o.classList.remove('active'));
    e.target.classList.add('active');
  }
});

function setToggleGroup(groupId, value) {
  document.querySelectorAll(`#${groupId} .toggle-option`).forEach((opt) => {
    opt.classList.toggle('active', opt.dataset.value === value);
  });
}

function getToggleGroupValue(groupId) {
  const active = document.querySelector(`#${groupId} .toggle-option.active`);
  return active ? active.dataset.value : null;
}
