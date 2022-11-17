import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import AudiolibrosAdminPage from './admin/AudiolibrosAdminPage';

const AudiolibrosRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AudiolibrosAdminPage />} />
    </Routes>
  )
}

export default memo(AudiolibrosRoutes)