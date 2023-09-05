import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import ProtectedView from "./views/ProtectedView";
import SettingsView from "./views/SettingsView";






// MAIN APP ROUTER

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: HomeView },
        { path: "/login", view: LoginView },
        { path: "/settings/:id", view: SettingsView },
        { path: "/settings", view: SettingsView },
        { path: "/protected", view: ProtectedView }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});



// REGISTER DIALOG

const register = document.getElementById("register");

const registerDialog = document.getElementById("registerDialog");
const usernameField = registerDialog.querySelector('[type="text"]');
const passwordField = registerDialog.querySelector('[type="password"]');
const cancelButton = registerDialog.querySelector(['button[value="cancel"]']);
const registerButton = registerDialog.querySelector(['button[value="register"]']);

register.addEventListener("click", (event) => {
    console.log(event);
    registerDialog.show();
    console.log(usernameField)
});

// close event of dialog - 
registerDialog.addEventListener("close", (e) => {
    console.log("closing the dialog")
});

registerDialog.addEventListener("submit", async (e) => {
    //event.preventDefault();
    registerDialog.close();

    const data = await registerLogic(usernameField.value, passwordField.value);
    console.log(data);
});

cancelButton.addEventListener("click", (event => {
    event.preventDefault();
    registerDialog.close();
}));

registerButton.addEventListener("click", (async event => {
    
}));

async function registerLogic(username, password) {
    const response = await fetch('http://localhost:5000/reg',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
    },
    body: JSON.stringify({username, password})
    });
  
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  
    const data = await response.json();
    return data;
  }