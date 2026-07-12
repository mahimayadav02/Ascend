// ============================================
// AUTH — validation + mock submit behavior
// Mock only: no real backend calls yet.
// On successful validation, navigates to dashboard.html
// ============================================

const EYE_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.62 21.62 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>';

function setupPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach((btn) => {
    btn.innerHTML = EYE_OFF;
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.innerHTML = isHidden ? EYE_OPEN : EYE_OFF;
    });
  });
}

function showError(input, message) {
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

function clearError(input) {
  input.classList.remove('error');
  const field = input.closest('.field');
  const err = field.querySelector('.error-text');
  if (err) err.remove();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clearAllErrors(form) {
  form.querySelectorAll('.input').forEach(clearError);
}

// ---------- LOGIN ----------
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(loginForm);

    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    let valid = true;

    if (!email.value.trim()) {
      showError(email, 'Email is required');
      valid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError(email, 'Enter a valid email address');
      valid = false;
    }

    if (!password.value) {
      showError(password, 'Password is required');
      valid = false;
    }

    if (valid) {
      // Mock auth — real backend integration replaces this later
      window.location.href = 'dashboard.html';
    }
  });
}

// ---------- REGISTER ----------
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(registerForm);

    const name = document.getElementById('register-name');
    const email = document.getElementById('register-email');
    const password = document.getElementById('register-password');
    const confirm = document.getElementById('register-confirm');
    let valid = true;

    if (!name.value.trim()) {
      showError(name, 'Name is required');
      valid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'Email is required');
      valid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError(email, 'Enter a valid email address');
      valid = false;
    }

    if (!password.value) {
      showError(password, 'Password is required');
      valid = false;
    } else if (password.value.length < 6) {
      showError(password, 'Must be at least 6 characters');
      valid = false;
    }

    if (!confirm.value) {
      showError(confirm, 'Please confirm your password');
      valid = false;
    } else if (confirm.value !== password.value) {
      showError(confirm, 'Passwords do not match');
      valid = false;
    }

    if (valid) {
      // Mock auth — real backend integration replaces this later
      window.location.href = 'dashboard.html';
    }
  });
}

setupPasswordToggles();
