import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS } from '../config/router/path';
import { SaveRequestData } from '../helpers/helpRequestBackend'
import { authAccess } from '../services/auth.axios'

export const AuthContext = createContext();

const TOKEN_BIBLIOTECA_VIRTUAL = "TOKEN_BIBLIOTECA_VIRTUAL";

export default function AuthContextProvider ({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(TOKEN_BIBLIOTECA_VIRTUAL) ? true : false);
  const [user, setUser] = useState(null);

  const getAccess = () => {
    SaveRequestData({
      path: ACCESS,
      body: localStorage.getItem(TOKEN_BIBLIOTECA_VIRTUAL),
      fnRequest: authAccess,
      success: (resp) => {
        setUser(resp.data)
        // setIsAuthenticated(true)
      },
      error: (err) => {
        localStorage.removeItem(TOKEN_BIBLIOTECA_VIRTUAL);
        window.location.reload()
        // setIsAuthenticated(false)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_BIBLIOTECA_VIRTUAL);
    setUser(null);
    window.location.reload()
    // setIsAuthenticated(false);
  }

  const login = useCallback((token) => {
    localStorage.setItem(TOKEN_BIBLIOTECA_VIRTUAL, token);
    // setIsAuthenticated(true);
  }, [])

  const value = useMemo(() => ({
    login,
    logout,
    isAuthenticated,
    user,
    setUser
  }), [isAuthenticated, login, user])

  useEffect(() => {
    if (isAuthenticated) getAccess()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}