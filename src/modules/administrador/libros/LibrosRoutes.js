import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import LibrosAdminPage from './admin/LibrosAdminPage';

const LibrosRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<LibrosAdminPage />} />
    </Routes>
  )
}

export default memo(LibrosRoutes)