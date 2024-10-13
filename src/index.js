import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./CryptoContext";
import { Auth0Provider } from '@auth0/auth0-react';
import { FavoritesProvider } from './FavoritesContext'; // Import the FavoritesProvider

// Fetching domain and clientId from .env file
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    {/* Wrapping the App with Auth0Provider for authentication */}
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}  // Where the user should be redirected after login
    >
      <CryptoContext>
        <FavoritesProvider> {/* Wrapping the App with FavoritesProvider */}
          <App />
        </FavoritesProvider>
      </CryptoContext>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);