(async function () {
  try {
    const res = await fetch('backend/auth/session_check.php');
    const data = await res.json();
    if (!data.loggedIn) {
      window.location.href = 'login.html';
    }
  } catch (err) {
    window.location.href = 'login.html';
  }
})();
