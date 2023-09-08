export { logoutApp, loginApp, registerApp };

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
