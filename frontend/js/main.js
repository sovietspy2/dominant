
import HomeView from "./views/HomeView";
import ProtectedView from "./views/ProtectedView";
import SettingsView from "./views/SettingsView";
import LogoutView from "./views/LogoutView";
import UserProfileView from "./views/UserProfileView";


import "./components/Chat";
import "./components/AuthDialog";
import "./components/UserInfo";
import "./components/UserEditor";
import "./components/TextField";
import "./components/Toast";

import { logoutApp } from "./utils/http";


// MAIN APP ROUTER

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: HomeView },
    { path: "/login", view: HomeView },
    { path: "/register", view: HomeView },
    { path: "/settings/:id", view: SettingsView },
    { path: "/settings", view: SettingsView },
    { path: "/protected", view: ProtectedView },
    { path: "/logout", view: LogoutView},
    { path: "/user", view: UserProfileView}
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
  
});
addAppEventListeners();

function addAppEventListeners() {
    // GLOBAL LINKS
  const registerButton = document.getElementById("register");
  const registerDialog = document.querySelector(
    'custom-dialog[auth-event-type="register"'
  );

  registerButton.addEventListener("click", (event) => {
    registerDialog.openDialog();
  });

  const loginDialog = document.querySelector(
    'custom-dialog[auth-event-type="login"'
  );
  const loginButton = document.getElementById("login");
  loginButton.addEventListener("click", (event) => {
    loginDialog.openDialog();
  });

  const logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", async (e)=> {
    logoutApp();
  });
}


console.log(`API URL: ${process.env.API}`);
