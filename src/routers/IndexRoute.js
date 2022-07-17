import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LOGIN, LOGOUT } from '../config/router/path'
import SignInPage from '../modules/authenticated/SignInPage';
import LogoutPage from '../modules/authenticated/LogoutPage';
import ModulesRoute from './ModulesRoute';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute'

export default function IndexRoute () {
  return (
    <Routes>
      <Route path={"*"} element={<PrivateRoute path="*" element={<ModulesRoute />} />} />
      <Route path={`${LOGIN}/*`} element={<PublicRoute path="/" element={<SignInPage />} />} />
      <Route path={`${LOGOUT}/*`} element={<PrivateRoute path="/" element={<LogoutPage />} />} />
    </Routes>
  )
}