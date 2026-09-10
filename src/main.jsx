import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'

import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'

// Clean URLs (/about, not /#/about) when served over http — Netlify's SPA
// redirect in netlify.toml sends every path to index.html. Falls back to
// hash routing if the file is ever opened straight off disk.
const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
