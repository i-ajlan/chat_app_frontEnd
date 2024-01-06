import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContactProvider } from './contexts/ContactContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { ConversationProvider } from './contexts/ConversationContext.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <SocketProvider>
        <ContactProvider>
          <ConversationProvider>
            <App />
          </ConversationProvider>
        </ContactProvider>
      </SocketProvider>
    </UserProvider>
  </React.StrictMode>,
)
