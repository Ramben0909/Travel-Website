/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-lqqb867tohygzl1e.us.auth0.com"
    clientId="dXNXyvqrroVWTIXSxj8X7Qqsaj2Pvs8U"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)
