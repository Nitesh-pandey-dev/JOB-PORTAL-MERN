import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/context/auth'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthProvider>
)