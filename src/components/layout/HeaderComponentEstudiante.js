import React, { memo, useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuthContext from '../../hooks/useAuthContext';
import useLayoutContext from '../../hooks/useLayoutContext';
import "./HeaderComponentEstudiante.css"
import arrowPrevious from "../../assets/icons/flecha-atras.png"
import arrowNext from "../../assets/icons/flecha-siguiente.png"
import iconHome from "../../assets/icons/home.png"
import iconInterrogacion from "../../assets/icons/interrogacion.png"
import iconCategorias from "../../assets/icons/categorias.png"
import iconSearch from "../../assets/icons/buscar.png"
import iconUserNiño from "../../assets/icons/user-niño.png"
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pathFront } from '../../config/router/pathFront';
import Controls from '../../framework/components/Controls';

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

const HeaderComponentEstudiante = () => {
  const theme = useTheme();
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [role, setRole] = React.useState(null);
  const {open, setOpen} = useLayoutContext()
  const [openPerfil, setOpenPerfil] = useState(false)

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
        (role && role === "Estudiante") 
        ? "background-green_500 content-header"
        : (role && role === "Docente") 
          ? "background-blue_700 content-header"
          : "background-white_100 content-header"}
      >
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton> */}

        <div className="header__buttons">
          <Tooltip title="Regresar" placement="bottom">
            <div className="header__buttons__link" onClick={() => navigate(-1)}>
              <img src={arrowPrevious} style={{ width: "15px" }} alt="" />
            </div>
          </Tooltip>

          <Tooltip title="Avanzar" placement="bottom">
            <div className="header__buttons__link" onClick={() => navigate(1)}>
              <img src={arrowNext} style={{ width: "15px" }} alt="" />
            </div>
          </Tooltip>

          <Tooltip title="Inicio" placement="bottom">
            <div className="header__buttons__link" onClick={() => navigate(pathFront.HOME)}>
              <img src={iconHome} style={{ width: "35px" }} alt="" />
            </div>
          </Tooltip>

          <Tooltip title="¿Tienes alguna pregunta?" placement="bottom">
            <div className="header__buttons__link" onClick={() => navigate(pathFront.ESTUDIANTE_QUESTIONS)}>
              <img src={iconInterrogacion} style={{ width: "50%" }} alt="" />
            </div>
          </Tooltip>

          <Tooltip title="Busca por categoria" placement="bottom">
            <div className="header__buttons__link" onClick={() => navigate(pathFront.ESTUDIANTE_BUSCAR_CATEGORIAS)}>
              <img src={iconCategorias} style={{ width: "30px" }} alt="" />
            </div>
          </Tooltip>

          <Tooltip title="Buscar..." placement="bottom">
            <div className="header__buttons__link" onClick={() => navigate(pathFront.ESTUDIANTE_BUSCAR_LIBROS)}>
              <img src={iconSearch} style={{ width: "50%" }} alt="" />
            </div>
          </Tooltip>
        </div>

        {/* {
          open && 
          <IconButton onClick={handleDrawerClose} sx={{ marginRight: "10px" }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: "#fff" }} /> : <ChevronRightIcon sx={{ color: "#fff" }} />}
          </IconButton>
        } */}
        
        <div className="header__buttons">
          <Tooltip title="Ver mi Perfil" placement="bottom" onClick={() => setOpenPerfil(!openPerfil)}>
            <div className="header__buttons__link">
              <img src={iconUserNiño} style={{ width: "25px" }} alt="" />
            </div>
          </Tooltip>
          
          <Typography variant="h6" component="div" style={{ display: "flex", alignItems: "center" }}>
            { user?.userAccess && user.userAccess.NOMBRE_USUARIO }
          </Typography>

          {openPerfil && 
          <div 
            className="header__buttons__tooltip__perfil background-white_100"
            style={{ 
              display: "grid", 
              gridTemplateColumns: "30% 1fr",
              gap: "15px", 
              padding: "15px", 
              justifyItems: "center",
              alignContent: "center"
            }}
          >
            <div className='display-flex display-flex-center-center' >
              <img src={iconUserNiño} style={{ width: "60px" }} alt="" />
            </div>
            <div style={{ justifySelf: "start" }}>
              <div style={{ marginBottom: "10px" }}>
                <Controls.TextComponent variant="h2" component="span">
                  { user?.userAccess && user.userAccess.NOMBRE_USUARIO }
                </Controls.TextComponent>
              </div>
          
              <Controls.ButtonComponent 
                variant="medium" 
                type="red" 
                title="Salir" 
                onClick={() => navigate("/logout")}
              />
            </div>
          </div>
          }
        </div>
        
      </Toolbar>
    </AppBar>
  );
}

export default memo(HeaderComponentEstudiante)
