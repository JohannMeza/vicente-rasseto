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
import { ICON } from '../../framework/components/icons/Icon';

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
let mediaQuery = window.matchMedia("(max-width: 600px)");

const HeaderComponentEstudiante = () => {
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const [role, setRole] = React.useState(null);
  const [openPerfil, setOpenPerfil] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const ValidarScreen = () => {
    if (mediaQuery.matches) return true
    else return false
  }

  const HandleClickMenu = (value) => {
    setOpenMenu(value)
    setOpenPerfil(false)
  }
  
  const HandleClickPerfil = (value) => {
    if (ValidarScreen()) {
      setOpenPerfil(value)
      setOpenMenu(false)
    } else {
      setOpenPerfil(value)
    }
  }
  
  const HandleClickMenuItem = (callback) => {
    if (ValidarScreen()) {
      callback();
      setOpenPerfil(false)
      setOpenMenu(false)
    } else {
      callback();
    }
  } 

  useEffect(() => (user) && setRole(user.userAccess.ID_PERFILES.NOMBRE_PERFIL), [user])

  useEffect(() => {
    mediaQuery.addListener((event) => (event.matches) ? setOpenMenu(false) : setOpenMenu(true))
    ValidarScreen() ? setOpenMenu(false) : setOpenMenu(true)
  }, [])

  return (
    <AppBar position="fixed">
      <Toolbar className={
        (role && role === "Estudiante") 
        ? "background-green_500 content-header"
        : (role && role === "Docente") 
          ? "background-blue_700 content-header"
          : "background-white_100 content-header"}
      >
        <Tooltip title="Menú" placement="bottom" className='header_buttons_menu' onClick={() => HandleClickMenu(!openMenu)}>
          <div className='display-flex' style={{ gap: '15px' }}>
            <div className="header__buttons__link">
              {ICON.WIDGETS}
            </div>
            <Typography className='header__buttons__link__label color-text' variant="h6" component="div">
              Menú
            </Typography>
          </div>
        </Tooltip>

        {openMenu && <div className="header_buttons_content header__buttons">
          <MenuItemComponent title="Regresar" navigate={() => HandleClickMenuItem(() => navigate(-1))} label="Regresar" img={arrowPrevious} style={{ width: '40%' }} />
          <MenuItemComponent title="Avanzar" navigate={() => HandleClickMenuItem(() => navigate(1))} label="Avanzar" img={arrowNext} style={{ width: '40%' }} />
          <MenuItemComponent title="Inicio" navigate={() => HandleClickMenuItem(() => navigate(pathFront.HOME))} label="Inicio" img={iconHome} style={{ width: '90%' }} />
          {/* <MenuItemComponent title="¿Tienes alguna pregunta?" navigate={() => HandleClickMenuItem(() => navigate(pathFront.ESTUDIANTE_QUESTIONS))} label="¿Tienes alguna pregunta?" img={iconInterrogacion} style={{ width: '60%' }} /> */}
          {/* <MenuItemComponent title="Busca por categoria" navigate={() => HandleClickMenuItem(() => navigate(pathFront.ESTUDIANTE_QUESTIONS))} label="Busca por categoria" img={iconCategorias} style={{ width: '60%' }} /> */}
          <MenuItemComponent title="Buscar...1" navigate={() => HandleClickMenuItem(() => navigate(pathFront.ESTUDIANTE_BUSCAR_LIBROS))} label="Buscar..." img={iconSearch} style={{ width: '60%' }} />
        </div>}
        
        <div className="header__buttons">
          <Tooltip title="Ver mi Perfil" placement="bottom" onClick={() => HandleClickPerfil(!openPerfil)}>
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

const MenuItemComponent = ({ title, navigate, label, img, style }) => {
  return (
    <Tooltip title={title} placement="bottom">
      <div className='display-flex color-text' style={{ gap: '15px' }}>
        <div className="header__buttons__link" onClick={() => navigate()}>
        <img src={img} style={style} alt="" />
        </div>
        <Typography className='header__buttons__link__label' variant="h6" component="div">
          {label}
        </Typography>
      </div>
    </Tooltip>
  )
}

export default memo(HeaderComponentEstudiante)