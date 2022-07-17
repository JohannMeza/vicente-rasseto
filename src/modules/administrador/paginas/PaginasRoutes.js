import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginasAdminPage from './admin/PaginasAdminPage';
import PaginasDetailPage from './detail/PaginasDetailPage';

const PaginasRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<PaginasAdminPage />} />
      <Route path="/:id" element={<PaginasDetailPage />} />
      <Route path="/new" element={<PaginasDetailPage />} />
    </Routes>
  )
}

export default memo(PaginasRoutes)