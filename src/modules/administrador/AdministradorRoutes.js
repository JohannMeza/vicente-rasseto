import { Box, CssBaseline } from '@mui/material';
import React, { memo } from 'react';
import HeaderComponent from '../../components/layout/HeaderComponent';
import NavbarComponent from '../../components/layout/NavbarComponent'
import { styled } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import PaginasRoutes from './paginas/PaginasRoutes';
import PerfilesRoutes from './perfiles/PerfilesRoutes';
import useLayoutContext from '../../hooks/useLayoutContext';

const drawerWidth = 296;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const AdministradorRoutes = () => {  
  const {open} = useLayoutContext()

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderComponent
        drawerWidth={drawerWidth}
      />
      <NavbarComponent
        DrawerHeader={DrawerHeader}
      />
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/administrador/paginas/*" element={<PaginasRoutes />} />
          <Route path="/seguridad/perfiles/*" element={<PerfilesRoutes />} />
        </Routes>
      </Main>
    </Box>
  )
}

export default memo(AdministradorRoutes)