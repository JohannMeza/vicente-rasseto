import { Box, CssBaseline } from '@mui/material';
import React, { memo } from 'react';
import HeaderComponentEstudiante from '../../components/layout/HeaderComponentEstudiante';
import { styled } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AudiolibroPage from './pages/AudiolibroPage';
import BibliotecaPage from './pages/BibliotecaPage';
import PreviewLibroPage from './pages/PreviewLibroPage';
import ReadLibroPage from './pages/ReadLibroPage';
import QuestionsPage from './pages/QuestionsPage';
import BusquedaCategoriasPage from './pages/BusquedaCategoriasPage';
import BusquedaLibrosPage from './pages/BusquedaLibrosPage';
import Logo from '../../assets/resources/logo-transparente.png';

const drawerWidth = 296;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const EstudianteRoutes = () => {  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderComponentEstudiante
        drawerWidth={drawerWidth}
      />
      <Box style={{ 
        flexGrow: 1,
        padding: "25px",
        minHeight: "100vh",
        background: `center 130px / 30% no-repeat url(${Logo})`,
        backgroundAttachment: "fixed"
      }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/audiolibro" element={<AudiolibroPage />} />
          <Route path="/biblioteca" element={<BibliotecaPage />} />
          <Route path="/preview/libro/:id" element={<PreviewLibroPage />} />
          <Route path="/read/libro/:id" element={<ReadLibroPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/search/categorias" element={<BusquedaCategoriasPage />} />
          <Route path="/search/libros" element={<BusquedaLibrosPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default memo(EstudianteRoutes)