import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import GradosAdminPage from './admin/GradosAdminPage';
import ConfiguracionDetail from './detail/ConfiguracionDetail';

const GradosRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<GradosAdminPage />} />
      <Route path="/admin/:id" element={<ConfiguracionDetail />} />
    </Routes>
  )
}

export default memo(GradosRoutes)