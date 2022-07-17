import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import HeaderComponent from '../../components/layout/HeaderComponent';
import NavbarComponent from '../../components/layout/NavbarComponent'
import { styled } from '@mui/material/styles';

const drawerWidth = 296;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdministradorAdminPage () {  
  const [open, setOpen] = React.useState(false);
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
        open={open}
        setOpen={setOpen}
      />
      <NavbarComponent
        open={open}
        DrawerHeader={DrawerHeader}
      />
      <Main open={open}>
        <DrawerHeader />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate facilis voluptas sint necessitatibus molestias iste minima assumenda voluptatibus, vero officiis dolore! Officiis cum ipsa, distinctio rem facilis in sunt possimus.</p>
      </Main>
    </Box>
  )
}

