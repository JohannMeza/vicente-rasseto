import React from 'react';
import HeaderComponent from './HeaderComponent';
import { styled } from '@mui/material/styles';
import NavbarComponent from './NavbarComponent'

const drawerWidth = 296;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SidebarComponent = () => {
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

  return(
    <>
      <HeaderComponent
        drawerWidth={drawerWidth}
        open={open}
        setOpen={setOpen}
      />
      <NavbarComponent
        open={open}
        DrawerHeader={DrawerHeader}
      />
    </>
  )
}