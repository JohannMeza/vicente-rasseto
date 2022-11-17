import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import HeaderComponent from '../../components/layout/HeaderComponent';
import NavbarComponent from '../../components/layout/NavbarComponent'
import { styled } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import useLayoutContext from '../../hooks/useLayoutContext';
import PaginasRoutes from '../componentes/paginas/PaginasRoutes';
import PerfilesRoutes from '../componentes/perfiles/PerfilesRoutes';
import LibrosRoutes from '../componentes/libros/LibrosRoutes';
import AutoresRoutes from '../componentes/autores/AutoresRoutes';
import CategoriasRoutes from '../componentes/categorias/CategoriasRoutes';
import EtiquetasRoutes from '../componentes/etiquetas/EtiquetasRoutes';
import NivelEstudioRoutes from '../componentes/grados/NivelEstudioRoutes';
import AlumnosRoutes from '../componentes/alumnos/AlumnosRoutes';
import DocentesRoutes from '../componentes/docentes/DocentesRoutes';
import AudiolibrosRoutes from '../componentes/audiolibros/AudiolibrosRoutes';

const drawerWidth = 296;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdministradorAdminPage () {  
  const {open} = useLayoutContext()

  // const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  //   ({ theme, open }) => ({
  //     flexGrow: 1,
  //     padding: theme.spacing(3),
  //     transition: theme.transitions.create('margin', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen,
  //     }),
  //     marginLeft: `-${drawerWidth}px`,
  //     ...(open && {
  //       transition: theme.transitions.create('margin', {
  //         easing: theme.transitions.easing.easeOut,
  //         duration: theme.transitions.duration.enteringScreen,
  //       }),
  //       marginLeft: 0,
  //     }),
  //   }),
  // );
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderComponent
        drawerWidth={drawerWidth}
      />
      <NavbarComponent
        DrawerHeader={DrawerHeader}
      />
      <Box style={{ 
        marginLeft: open ? "0px" : `-${drawerWidth}px` ,
        flexGrow: 1,
        padding: "25px"
      }}>
        <DrawerHeader />
        <Routes>
          <Route path="/paginas/*" element={<PaginasRoutes />} />
          <Route path="/perfiles/*" element={<PerfilesRoutes />} />
          <Route path="/libros/*" element={<LibrosRoutes />} />
          <Route path="/audiolibros/*" element={<AudiolibrosRoutes />} />
          <Route path="/autores/*" element={<AutoresRoutes />} />
          <Route path="/categorias/*" element={<CategoriasRoutes />} />
          <Route path="/etiquetas/*" element={<EtiquetasRoutes />} />
          <Route path="/nivel_estudio/*" element={<NivelEstudioRoutes />} />
          <Route path="/alumnos/*" element={<AlumnosRoutes />} />
          <Route path="/docentes/*" element={<DocentesRoutes />} />
        </Routes>
      </Box>
    </Box>
  )
}

