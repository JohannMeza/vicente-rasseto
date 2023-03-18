import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import LibrosAdminPage from './admin/LibrosAdminPage';
import LibrosDetailPage from './detail/LibrosDetailPage';
import LibrosGradosPage from './detail/LibrosGradosPage';

const LibrosRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<LibrosAdminPage />} />
      <Route path="/new" element={<LibrosDetailPage />} />
      <Route path="/update/:id" element={<LibrosDetailPage />} />
      <Route path="/grados/:id" element={<LibrosGradosPage />} />
    </Routes>
  )
}

export default memo(LibrosRoutes)