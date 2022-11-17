import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import LibrosAdminPage from './admin/LibrosAdminPage';
import LibrosDetailPage from './detail/LibrosDetailPage';


const LibrosRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<LibrosAdminPage />} />
      <Route path="/new" element={<LibrosDetailPage />} />
      <Route path="/update/:id" element={<LibrosDetailPage />} />
    </Routes>
  )
}

export default memo(LibrosRoutes)