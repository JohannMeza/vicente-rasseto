import { createElement, memo, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { SaveRequestData } from "../../helpers/helpRequestBackend";
import { pathServer } from "../../config/router/path";
import { SERVICES_GET } from "../../services/services.axios";
import { MessageUtil } from "../../util/MessageUtil";
import { DashboardAdmin } from "../componentes/dashboard/admin/DashboardAdmin";
import useLayoutContext from "../../hooks/useLayoutContext";
import useLoaderContext from "../../hooks/useLoaderContext";
import useAuthContext from "../../hooks/useAuthContext";
import HeaderComponent from "../../components/layout/HeaderComponent";
import NavbarComponent from "../../components/layout/NavbarComponent";

const drawerWidth = 296;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

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
              arrFileComponents.push({url: el.PATH_BASE, component: createElement(module.default)})
            })
            .catch((err) => {
              console.log(err);
            });
          });
        })
        arrFileComponents.push({url: '/', component: <DashboardAdmin />})
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
