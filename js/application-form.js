// ============================================
// APPLICATION FORM — Add/Edit slide-over
// Shared logic: included on any page that has the
// #app-slide-panel markup (Applications page now,
// Application Details page later for its Edit action).
// ============================================

let currentEditId = null;

async function openApplicationForm(mode, appId) {
  currentEditId = mode === 'edit' ? appId : null;
  const panel = document.getElementById('app-slide-panel');
  const overlay = document.getElementById('app-form-overlay');
  const form = document.getElementById('app-form');

  form.reset();
  clearFormErrors(form);
  setToggleGroup('jobType-group', 'Internship');
  setToggleGroup('mode-group', 'Off-Campus');
  setSwitch('referral-switch', false);
  document.getElementById('f-status').value = 'Wishlist';

  document.getElementById('form-title').textContent = mode === 'edit' ? 'Edit Application' : 'Add Application';
  document.getElementById('form-submit-btn').textContent = mode === 'edit' ? 'Save Changes' : 'Add Application';

  overlay.classList.add('open');
  panel.classList.add('open');

  if (mode === 'edit') {
    const app = await getApplicationById(appId);
    if (app) {
      document.getElementById('f-company').value = app.company;
      document.getElementById('f-role').value = app.role;
      document.getElementById('f-location').value = app.location;
      document.getElementById('f-status').value = app.status;
      document.getElementById('f-dateApplied').value = app.dateApplied;
      document.getElementById('f-jobLink').value = app.jobLink;
      document.getElementById('f-notes').value = app.notes || '';
      setToggleGroup('jobType-group', app.jobType);
      setToggleGroup('mode-group', app.mode);
      setSwitch('referral-switch', app.referral);
    }
  }
}

function closeApplicationForm() {
  document.getElementById('app-slide-panel').classList.remove('open');
  document.getElementById('app-form-overlay').classList.remove('open');
}

function setToggleGroup(groupId, value) {
  document.querySelectorAll(`#${groupId} .toggle-option`).forEach((opt) => {
    opt.classList.toggle('active', opt.dataset.value === value);
  });
}

function getToggleGroupValue(groupId) {
  const active = document.querySelector(`#${groupId} .toggle-option.active`);
  return active ? active.dataset.value : null;
}

function setSwitch(id, on) {
  document.getElementById(id).classList.toggle('on', !!on);
}

function getSwitchValue(id) {
  return document.getElementById(id).classList.contains('on');
}

function showFormError(input, message) {
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

function clearFormErrors(form) {
  form.querySelectorAll('.input').forEach((input) => {
    input.classList.remove('error');
    const field = input.closest('.field');
    const err = field && field.querySelector('.error-text');
    if (err) err.remove();
  });
}

// Toggle group + switch click delegation (works for any instance on the page)
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle-option')) {
    const group = e.target.closest('.toggle-group');
    group.querySelectorAll('.toggle-option').forEach((o) => o.classList.remove('active'));
    e.target.classList.add('active');
  }
  const switchEl = e.target.closest('.switch');
  if (switchEl) switchEl.classList.toggle('on');
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('app-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormErrors(form);

    const company = document.getElementById('f-company');
    const role = document.getElementById('f-role');
    const location = document.getElementById('f-location');
    const dateApplied = document.getElementById('f-dateApplied');
    const jobLink = document.getElementById('f-jobLink');
    const submitBtn = document.getElementById('form-submit-btn');
    let valid = true;

    if (!company.value.trim()) { showFormError(company, 'Company name is required'); valid = false; }
    if (!role.value.trim()) { showFormError(role, 'Job role is required'); valid = false; }
    if (!location.value.trim()) { showFormError(location, 'Location is required'); valid = false; }
    if (!dateApplied.value) { showFormError(dateApplied, 'Date applied is required'); valid = false; }

    if (!jobLink.value.trim()) {
      showFormError(jobLink, 'Job link is required');
      valid = false;
    } else {
      try { new URL(jobLink.value.trim()); } catch (err) {
        showFormError(jobLink, 'Enter a valid URL (include https://)');
        valid = false;
      }
    }

    if (!valid) return;

    const appData = {
      company: company.value.trim(),
      role: role.value.trim(),
      location: location.value.trim(),
      jobType: getToggleGroupValue('jobType-group') || 'Internship',
      mode: getToggleGroupValue('mode-group') || 'Off-Campus',
      status: document.getElementById('f-status').value,
      dateApplied: dateApplied.value,
      jobLink: jobLink.value.trim(),
      notes: document.getElementById('f-notes').value.trim(),
      referral: getSwitchValue('referral-switch'),
    };

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    try {
      const result = currentEditId
        ? await updateApplication(currentEditId, appData)
        : await addApplication(appData);

      if (result.success) {
        closeApplicationForm();
        if (window.onApplicationSaved) window.onApplicationSaved();
      } else {
        showFormError(company, result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      showFormError(company, 'Could not reach the server. Is XAMPP running?');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
