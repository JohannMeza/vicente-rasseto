import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HOME } from "../config/router/path";
import useAuthContext from "../hooks/useAuthContext";

export default function PublicRoute (props) {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate();
  
  useEffect(() => {
    isAuthenticated && navigate(HOME)
  }, [isAuthenticated, navigate])

  return (
    <Routes>
      <Route {...props} />
    </Routes>
  )
}