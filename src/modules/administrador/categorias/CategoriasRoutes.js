import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriaAdminPage from './admin/CategoriaAdminPage';

const CategoriasRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<CategoriaAdminPage />} />
    </Routes>
  )
}

export default memo(CategoriasRoutes)