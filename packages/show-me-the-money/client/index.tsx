import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/App";
import store from "./store";

document.addEventListener("DOMContentLoaded", () => {
  createRoot(document.getElementById("app") as HTMLElement).render(
    <Auth0Provider
      domain="dev-f1e85xv6.au.auth0.com"
      clientId="EGmvHTsRvHb6oXj0LVk1bJGU1rr88iyl"
      redirectUri={window.location.origin}
      audience="https://show-me-the-money/api"
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Auth0Provider>
  );
});
