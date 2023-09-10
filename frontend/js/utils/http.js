import { getCookie } from "./cookieUtils";

export { logoutApp, loginApp, registerApp, loadUserDataApp };

async function logoutApp() {
  const response = await fetch(`${process.env.API}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function registerApp(username, password) {
  const response = await fetch(`${process.env.API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

async function loginApp(username, password) {
  const response = await fetch(`${process.env.API}/login`, {
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
  const response = await fetch(`${process.env.API}/protected`,  {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json', 
      'X-CSRF-TOKEN': getCookie('csrf_access_token'),
  }});
}
