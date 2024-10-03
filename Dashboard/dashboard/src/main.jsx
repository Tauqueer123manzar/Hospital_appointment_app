import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App.jsx'

export const context=createContext({isAuthenticated:false});

const Appwrapper=()=>{
  const[isAuthenticated,setIsAuthenticated]=useState(false);
  const[user,setUser]=useState(false);
  return(
  <context.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser}}>
  </context.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
