import { Box, CssBaseline } from "@mui/material";
import React, { Component, memo, useEffect } from "react";
import HeaderComponent from "../../components/layout/HeaderComponent";
import NavbarComponent from "../../components/layout/NavbarComponent";
import { styled } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import useLayoutContext from "../../hooks/useLayoutContext";
import PaginasRoutes from "../componentes/paginas/PaginasRoutes";
import PerfilesRoutes from "../componentes/perfiles/PerfilesRoutes";
import LibrosRoutes from "../componentes/libros/LibrosRoutes";
import AutoresRoutes from "../componentes/autores/AutoresRoutes";
import CategoriasRoutes from "../componentes/categorias/CategoriasRoutes";
import EtiquetasRoutes from "../componentes/etiquetas/EtiquetasRoutes";
import NivelEstudioRoutes from "../componentes/grados/NivelEstudioRoutes";
import AlumnosRoutes from "../componentes/alumnos/AlumnosRoutes";
import DocentesRoutes from "../componentes/docentes/DocentesRoutes";
import AudiolibrosRoutes from "../componentes/audiolibros/AudiolibrosRoutes";
import { useState } from "react";
import { SaveRequestData } from "../../helpers/helpRequestBackend";
import { pathServer } from "../../config/router/path";
import { SERVICES_GET } from "../../services/services.axios";
import { MessageUtil } from "../../util/MessageUtil";
import useLoaderContext from "../../hooks/useLoaderContext";
import useAuthContext from "../../hooks/useAuthContext";

const drawerWidth = 296;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// var geeval = eval;
// let pagina = "PaginasRoutes";
// console.log(geeval(pagina))

const AdministradorRoutes = () => {
  const { open } = useLayoutContext();
  const { user } = useAuthContext();
  const [arrData, setArrData] = useState([]);
  const setLoader = useLoaderContext();

  // const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  // ({ theme, open }) => ({
  // flexGrow: 1,
  // padding: theme.spacing(3),
  // transition: theme.transitions.create('margin', {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  // marginLeft: `-${drawerWidth}px`,
  // ...(open && {
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // }),
  // }),
  // );

  const getPage = () => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.AUTH.PATH + user.userAccess.ID_PERFILES._id,
      body: "dataForm",
      fnRequest: SERVICES_GET,
      success: (resp) => {
        setLoader(false);
        let arrFileComponents = []
        
        resp.data.forEach(menu => {
          menu.ID_CONFIGURACION_SUBMENU?.forEach((el) => {
            if (el.PATH_FILE === "") return;
            import(`../${el.PATH_FILE}`)
            .then((module) => {
              arrFileComponents.push({url: el.PATH_BASE, component: React.createElement(module.default)})
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        setArrData(arrFileComponents);
      },
      error: (err) => {
        setLoader(false);
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderComponent drawerWidth={drawerWidth} />
        <NavbarComponent DrawerHeader={DrawerHeader} />
        <Box
          style={{
            marginLeft: open ? "0px" : `-${drawerWidth}px`,
            flexGrow: 1,
            padding: "25px",
            width: "100%"
          }}
        >
          <DrawerHeader />
          <Routes>
            {arrData.length > 0 && arrData.map((el, index) => (<Route path={el.url} key={index} element={el.component} />))}

            {/* <Route path="/paginas/*" element={<PaginasRoutes />} />
          <Route path="/perfiles/*" element={<PerfilesRoutes />} />
          <Route path="/libros/*" element={<LibrosRoutes />} />
          <Route path="/audiolibros/*" element={<AudiolibrosRoutes />} />
          <Route path="/autores/*" element={<AutoresRoutes />} />
          <Route path="/categorias/*" element={<CategoriasRoutes />} />
          <Route path="/etiquetas/*" element={<EtiquetasRoutes />} />
          <Route path="/nivel_estudio/*" element={<NivelEstudioRoutes />} />
          <Route path="/alumnos/*" element={<AlumnosRoutes />} />
          <Route path="/docentes/*" element={<DocentesRoutes />} /> */}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default memo(AdministradorRoutes);
