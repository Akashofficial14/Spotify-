import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
  let {loginUserData} = useSelector((state)=>(state.auth))
  if(loginUserData){
    return <Navigate to={'/home'}/>
  }
  return <Outlet/>
}

export default PublicRoute
