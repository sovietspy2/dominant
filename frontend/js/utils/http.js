export { logoutApp, loginApp, registerApp, loadUserDataApp };

async function logoutApp() {
  const response = await fetch("http://localhost:5000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function registerApp(username, password) {
  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

async function loginApp(username, password) {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

async function loadUserDataApp() {
  const response = await fetch('http://localhost:5000/protected',  {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json', 
      'X-CSRF-TOKEN': getCookie('csrf_access_token'),
  }});
}
