import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import NivelEstudioAdminPage from './admin/NivelEstudioAdminPage';
import GradosDetail from './detail/GradosDetail';

const NivelEstudioRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<NivelEstudioAdminPage />} />
      <Route path="/configuracion/:id" element={<GradosDetail />} />
    </Routes>
  )
}

export default memo(NivelEstudioRoutes)