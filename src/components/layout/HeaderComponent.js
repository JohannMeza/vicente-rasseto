import React, { memo, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useAuthContext from '../../hooks/useAuthContext';
import useLayoutContext from '../../hooks/useLayoutContext';

const drawerWidth = 296;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const HeaderComponent = () => {
  const theme = useTheme();
  const { user } = useAuthContext()
  const [role, setRole] = React.useState(null);
  const {open, setOpen} = useLayoutContext()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      setRole(user.userAccess.ID_PERFILES.NOMBRE_PERFIL)
    }
  }, [user])

  return (
    <AppBar position="fixed" open={open} >
      <Toolbar className={
        (role && role === "Administrador") 
        ? "background-black_100"
        : (role && role === "Docente") 
          ? "background-blue_700"
          : "background-white_100"}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>

        {
          open && 
          <IconButton onClick={handleDrawerClose} sx={{ marginRight: "10px" }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: "#fff" }} /> : <ChevronRightIcon sx={{ color: "#fff" }} />}
          </IconButton>
        }
        
        <Typography variant="h6" noWrap component="div">
          { user && user.NOMBRE_USUARIO }
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default memo(HeaderComponent)
