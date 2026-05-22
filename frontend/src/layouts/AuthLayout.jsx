import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import PublicRoute from '../components/PublicRoute'
import SpotifyPhoneAuth from '../components/SpotifyPhoneAuth'

const AuthLayout = () => {
  // Use a string state: "login", "register", or "phone"
  const [authView, setAuthView] = useState("login")

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="w-full max-w-[500px] p-6">
        
        {/* Render ONLY the active component view context */}
        {authView === "login" && (
          <Login settoggle={setAuthView} />
        )}
        
        {authView === "register" && (
          <Register settoggle={setAuthView} />
        )}
        
        {authView === "phone" && (
          <SpotifyPhoneAuth settoggle={setAuthView} />
        )}
        
        <PublicRoute />
      </div>
    </div>
  )
}

export default AuthLayout