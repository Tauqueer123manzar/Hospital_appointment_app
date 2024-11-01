import { StrictMode, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
export const context = createContext({ isAuthenticated: false });

const Appwrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(false);
  return (
    <context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
    </context.Provider>
  )

}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appwrapper />
  </StrictMode>,
)
