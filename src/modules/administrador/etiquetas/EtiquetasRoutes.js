import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import EtiquetasAdminPage from './admin/EtiquetasAdminPage';

const LibrosRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<EtiquetasAdminPage />} />
    </Routes>
  )
}

export default memo(LibrosRoutes)