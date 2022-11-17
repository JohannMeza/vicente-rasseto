import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import PerfilesAdminPage from './admin/PerfilesAdminPage';
import PerfilesDetailPage from './detail/PerfilesDetailPage';

const PerfilesRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<PerfilesAdminPage />} />
      <Route path="/:id" element={<PerfilesDetailPage />} />
    </Routes>
  )
}

export default memo(PerfilesRoutes)