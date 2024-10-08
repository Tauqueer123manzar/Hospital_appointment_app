import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

export const context=createContext({isAuthenticated:false});
const Appwrapper=()=>{
  const[isAuthenticated,setIsAuthenticated]=useState(false);
  const[user,setUser]=useState(false);
  return(
    <context.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser}}>
      <App/>
    </context.Provider>
  )
}

export default Appwrapper;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appwrapper/>
  </StrictMode>,
)
