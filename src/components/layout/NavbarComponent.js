import { useNavigate } from 'react-router-dom';
import React, { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useAuthContext from '../../hooks/useAuthContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Stack } from '@mui/material';
import Logo from '../../assets/resources/logo.png';
import useLayoutContext from '../../hooks/useLayoutContext';

const drawerWidth = 296;

const NavbarComponent = ({ DrawerHeader }) => {
  const { user } = useAuthContext()
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const {open} = useLayoutContext()
  const [menus, setMenus] = useState([])

  useEffect(() => {
    if (user) {
      setRole(user.userAccess.ID_PERFILES.NOMBRE_PERFIL)
      setMenus(user.menusAndSubmenus)
    }
  }, [user])

  const [openCollapse, setOpenCollapse] = React.useState(false);    

  function handleOpenSettings(nameMenu){
    setOpenCollapse(openCollapse === nameMenu ? false : nameMenu);
  }

  const styleBaseMenu = {  
    padding: "8px 15px",
    width: "100%",
  }

  const styleMenu = {  
    width: "100%",
    color: (role === "Administrador") ? "var(--black_100)" : "var(--blue_700)",
    background: "var(--white_100)",
    padding: "8px 15px",
    borderRadius: "5px"
  }

  const styleMenuActive = {
    minWidth: "auto",
    color: (role === "Administrador") ? "var(--black_100)" : "var(--blue_700)"
  }

  const styleMenuInactive = {
    minWidth: "auto",
    color: "var(--white_100)"
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          background: (role && role === "Administrador") 
          ? "var(--black_100)"
          : (role && role === "Docente") 
            ? "var(--blue_700)"
            : "",
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader sx={{ justifyContent: "space-between", padding: "15px 0", minHeight: "150px" }}>
        <Box sx={{ flexGrow: "1", textAlign: "center", height: "100%" }}>
          <img src={Logo} alt=""  style={{ maxWidth: "120px", height: "inherit" }} />
        </Box>
      </DrawerHeader>
      {
        menus && 
        menus.map((menu, indexMenu) => 
          <List key={indexMenu}>
            <ListItem button sx={{ padding: "0 16px" }} onClick={() => handleOpenSettings(menu.ID_CONFIGURACION_MENU?.NOMBRE_MENU)}>
              <Stack 
              direction="row" 
              spacing={1} 
              alignItems="center" 
              sx={openCollapse === menu?.ID_CONFIGURACION_MENU?.NOMBRE_MENU ? styleMenu : styleBaseMenu}
              >
                <ListItemIcon sx={openCollapse === menu.ID_CONFIGURACION_MENU?.NOMBRE_MENU ? styleMenuActive : styleMenuInactive}>
                  <i className={`fa-solid ${menu.ID_CONFIGURACION_MENU?.NOMBRE_ICON || "fa-file-circle-exclamation"}`}></i>
                </ListItemIcon>
                <ListItemText 
                  primary={menu.ID_CONFIGURACION_MENU?.NOMBRE_MENU}
                  sx={openCollapse === menu.ID_CONFIGURACION_MENU?.NOMBRE_MENU ? styleMenuActive : styleMenuInactive}
                />
                {openCollapse === menu.ID_CONFIGURACION_MENU?.NOMBRE_MENU 
                ? <ExpandLess sx={openCollapse === menu.ID_CONFIGURACION_MENU?.NOMBRE_MENU ? styleMenuActive : styleMenuInactive} /> 
                : <ExpandMore sx={openCollapse === menu.ID_CONFIGURACION_MENU?.NOMBRE_MENU ? styleMenuActive : styleMenuInactive} />}
              </Stack>
            </ListItem>
            <Collapse in={openCollapse === menu.ID_CONFIGURACION_MENU?.NOMBRE_MENU} timeout="auto" unmountOnExit>
              {
                menu.ID_CONFIGURACION_SUBMENU && menu.ID_CONFIGURACION_SUBMENU?.map((submenu, indexSubmenu) => 
                  <List component="div" disablePadding onClick={() => navigate(submenu.PATH)} key={indexSubmenu}>
                    <ListItem button sx={{ padding: "5px 16px" }} >
                      <Stack 
                        direction="row" 
                        spacing={1} 
                        alignItems="center" 
                        sx={styleBaseMenu}
                      >
                        <ListItemIcon 
                        sx={{
                          ...styleMenuInactive,
                          width: "15px"
                        }}
                        >
                          <i className={`fa-solid ${submenu.NOMBRE_ICON || "fa-file-circle-exclamation"}`}></i>
                        </ListItemIcon>
                        <ListItemText 
                          primary={submenu.NOMBRE_SUBMENU}
                          sx={styleMenuInactive}
                        />
                      </Stack>
                    </ListItem>
                  </List>
                )
              }
            </Collapse>
          </List>
        )
      }
    </Drawer>
  );
}

export default memo(NavbarComponent)