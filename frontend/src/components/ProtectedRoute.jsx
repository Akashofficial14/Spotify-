import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
    let {loginUserData} = useSelector((state)=>(state.auth))
  if(!loginUserData){
    return <Navigate to={'/'}/>
  }
  return <Outlet/>
}

export default ProtectedRoute
