import React from 'react'
import { Outlet, Navigate } from "react-router";
import useAuth from '../hooks/auth/useAuth';

type Props = {}

const RequireAuth = () => {
  const {isAuthenticated} = useAuth();
  return (
    isAuthenticated()
      ?(<Outlet/>)//If is authenticated return TopBar and Children
      :<Navigate to="/LogIn"/>//TODO: Cambiar a login luego
  )
}

export default RequireAuth