import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserContext from './context/UserContext.jsx';
import CaptainContext from './context/CapatainContext.jsx';
import SocketProvider from './context/SocketContext.jsx';

const clerk_key = import.meta.env.VITE_CLERK_KEY;

// console.log(clerk_key);

if(!clerk_key){
  throw new Error("Key was not found");
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerk_key} >
    <CaptainContext>
      <UserContext>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </CaptainContext>
  </ClerkProvider>

)
