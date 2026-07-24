async function renderProfileView() {
  const user = await getUser();
  if (!user) return;

  const apps = await getApplications();

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

async function enterEditMode() {
  const user = await getUser();
  if (!user) return;

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

  document.getElementById('profile-edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('e-name');
    const personalEmail = document.getElementById('e-personal-email');
    const submitBtn = document.querySelector('#profile-edit-mode button[type="submit"]');

    name.classList.remove('error');
    personalEmail.classList.remove('error');

    if (!name.value.trim()) {
      showProfileError(name, 'Name is required');
      return;
    }

    const updates = {
      name: name.value.trim(),
      college: document.getElementById('e-college').value.trim(),
      branch: document.getElementById('e-branch').value.trim(),
      experience: document.getElementById('e-experience').value.trim(),
      personalEmail: personalEmail.value.trim(),
      collegeWorkEmail: document.getElementById('e-college-email').value.trim(),
      status: getToggleGroupValue('status-group') || 'Student',
    };

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    try {
      const result = await saveUser(updates);
      if (result.success) {
        await renderProfileView();
        exitEditMode();
      } else {
        showProfileError(personalEmail, result.message || 'Could not save changes.');
      }
    } catch (err) {
      showProfileError(personalEmail, 'Could not reach the server. Is XAMPP running?');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});

function showProfileError(input, message) {
  input.classList.add('error');
  const field = input.closest('.field');
  let err = field.querySelector('.error-text');
  if (!err) {
    err = document.createElement('span');
    err.className = 'error-text';
    field.appendChild(err);
  }
  err.innerHTML = `⚠ ${message}`;
}

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
