import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const api_key = import.meta.env.GOOGLE_CLIENT_ID


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = {api_key}>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
