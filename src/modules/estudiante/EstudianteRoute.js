import { Box, CssBaseline } from '@mui/material';
import React, { memo } from 'react';
import HeaderComponentEstudiante from '../../components/layout/HeaderComponentEstudiante';
import NavbarComponentEstudiante from '../../components/layout/NavbarComponentEstudiante'
import { styled } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import useLayoutContext from '../../hooks/useLayoutContext';
import HomePage from './pages/HomePage';
import AudiolibroPage from './pages/AudiolibroPage';
import BibliotecaPage from './pages/BibliotecaPage';
import PreviewLibroPage from './pages/PreviewLibroPage';
import ReadLibroPage from './pages/ReadLibroPage';


const drawerWidth = 296;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const EstudianteRoutes = () => {  
  const {open} = useLayoutContext()
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderComponentEstudiante
        drawerWidth={drawerWidth}
      />
      <Box style={{ 
        flexGrow: 1,
        padding: "25px"
      }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/audiolibro" element={<AudiolibroPage />} />
          <Route path="/biblioteca" element={<BibliotecaPage />} />
          <Route path="/preview/libro/:id" element={<PreviewLibroPage />} />
          <Route path="/read/libro/:id" element={<ReadLibroPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default memo(EstudianteRoutes)