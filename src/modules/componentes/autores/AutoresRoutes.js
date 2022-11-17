import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import AutoresAdminPage from './admin/AutoresAdminPage';

const LibrosRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AutoresAdminPage />} />
    </Routes>
  )
}

export default memo(LibrosRoutes)