export { logout };

async function logout() {
  const response = await fetch("http://localhost:5000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
