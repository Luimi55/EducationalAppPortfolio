import React from 'react'
import { getAccessTokenFromCookie } from '../../utils'

type Props = {}

const useAuth = () => {

    const isAuthenticated = () => {
        const cookie = getAccessTokenFromCookie()
        const isAuth = cookie!=""? true : false;
        return isAuth
    }

  return {
    isAuthenticated
  }
}

export default useAuth