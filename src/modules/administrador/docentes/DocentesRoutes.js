import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import DocentesAdminPage from './admin/DocentesAdminPage';

const DocentesRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<DocentesAdminPage />} />
    </Routes>
  )
}

export default memo(DocentesRoutes)