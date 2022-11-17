import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import AlumnosAdminPage from './admin/AlumnosAdminPage';

const AlumnosRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AlumnosAdminPage />} />
    </Routes>
  )
}

export default memo(AlumnosRoutes)