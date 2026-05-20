import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import PublicRoute from '../components/PublicRoute'

const AuthLayout = () => {
    const [toggle, settoggle] = useState(true)
  return (
    <div>
     {toggle?<Login settoggle={settoggle}/>:<Register settoggle={settoggle}/>}
     <PublicRoute/>
     
    </div>
  )
}

export default AuthLayout
