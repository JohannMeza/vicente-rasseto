import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PerfilesAdminPage from './admin/PerfilesAdminPage';
import PerfilesDetailPage from './detail/PerfilesDetailPage';

export default function PerfilesRoutes () {
  return (
    <Routes>
      <Route path="/admin" element={<PerfilesAdminPage />} />
      <Route path="/:id" element={<PerfilesDetailPage />} />
    </Routes>
  )
}