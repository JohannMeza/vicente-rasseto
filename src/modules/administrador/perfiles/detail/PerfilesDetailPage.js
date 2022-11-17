import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { useNavigate, useParams } from "react-router-dom";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { pathServer, SEGURIDAD_PERFILES_MENU_SUBMENU_SHOW, SEGURIDAD_PERFILES_MENU_SUBMENU_STORE, SEGURIDAD_PERFILES_SHOW } from "../../../../config/router/path";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SEGURIDAD_PERFILES_SHOW_AXIOS } from "../../../../services/seguridad_perfiles.axios";
import { useFormValidation } from "../../../../hooks/useFormValidation"
import { SEGURIDAD_PERFILES_MENU_SUBMENU_SHOW_AXIOS, SEGURIDAD_PERFILES_MENU_SUBMENU_STORE_AXIOS } from "../../../../services/seguridad_perfiles_menu_submenu.axios";
import { SERVICES_POST } from "../../../../services/services.axios";
import { MessageUtil } from "../../../../util/MessageUtil";
import { pathFront } from "../../../../config/router/pathFront";

const dataInitial = {}

export default function PerfilesDetailPage() {
  const styleBox = {
    background: "#F6F6F6",
    border: "1px solid var(--text)",
    padding: "5px 15px",
    borderRadius: "5px",
    height: "100%",
  };

  const setLoader = useLoaderContext();
  const navigate = useNavigate();
  const [paginas, setPaginas] = useState([]);
  const [subpaginas, setSubpaginas] = useState([]);

  const [perfil, setPerfil] = useState({})
  const [paginaSelect, setPaginaSelect] = useState(null);
  const {data, setData} = useFormValidation(dataInitial)
  const { id } = useParams()

  // ### PETICIONES

  const getPaginas = useCallback(
    (rowsPerPage = 10, page = 1) => {
      setLoader(true);
      SaveRequestData({
        path: pathServer.CONFIGURACION.MENU.INDEX,
        body: {},
        fnRequest: SERVICES_POST,
        pagination: true,
        rowsPerPage,
        page,
        success: (resp) => {
          setLoader(false);
          setPaginas(resp.data);
        },
        error: (err) => {
          setLoader(false);
          MessageUtil({ message: err.statusText, type: 'error', seg: 10})
        },
      });
    },
    [setLoader]
  );

  const getSubpaginas = (id) => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.CONFIG_MENU.SEARCH_SUBPAGINAS + id,
      body: {},
      fnRequest: SERVICES_POST,
      success: (resp) => {
        let arrSubmenus = resp.data?.ID_CONFIGURACION_SUBMENU;
        setSubpaginas(arrSubmenus)
        setLoader(false);
      },
      error: (err) => {
        setLoader(false);
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };
  const getPaginasByPerfil = (id) => {
    setLoader(true)
    SaveRequestData({
      path: `${SEGURIDAD_PERFILES_MENU_SUBMENU_SHOW}/${id}`,
      body: {},
      fnRequest: SEGURIDAD_PERFILES_MENU_SUBMENU_SHOW_AXIOS,
      success: (resp) => {
        let dataPage = {};
        resp.data?.forEach(el => {
          let arrIdSubmenus = Array.from(el.ID_CONFIGURACION_SUBMENU, el => el._id)
          dataPage[el.ID_CONFIGURACION_MENU._id] = arrIdSubmenus
        })
        setData(dataPage)
        setLoader(false)
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: 'error', seg: 10 })
      }
    })
  }

  const getPerfil = useCallback(() => {
    setLoader(true)
    SaveRequestData({
      path: `${SEGURIDAD_PERFILES_SHOW}/${id}`,
      body: {},
      fnRequest: SEGURIDAD_PERFILES_SHOW_AXIOS,
      success: (resp) => {
        setPerfil(resp.data)
        setLoader(false)
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: 'error', seg: 10 })
      },
    });
  }, [id])

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  const handleFormCheckedMenu = (e, el) => {
    if (!paginaSelect) return alert("No ha selecionado la página")
    if (paginaSelect._id !== el._id) return alert("Selecciona la pagina para actualizar")

    let { checked } = e.target
    let propData = removeAccents(el._id)
    getSubpaginas(paginaSelect._id)
  
    if (checked) {
      let arrIdSubpaginas = Array.from(subpaginas, el => el._id);
      setData({ ...data, [propData]: arrIdSubpaginas })
    } else {
      setData({ ...data, [propData]: [] })
    }
  }

  const handleFormCheckedSubmenu = (e, el) => {
    let { checked } = e.target;
    let listChecked = data[removeAccents(paginaSelect._id)];
    let propData = removeAccents(paginaSelect._id)

    if (checked) {
      let arrDataChecked = data[propData] || [];

      return setData({
        ...data,
        [propData]: [
          ...arrDataChecked,
          el._id
        ]
      })
    } else {
      let arrChecked = listChecked.filter(list => list !== el._id)

      return setData({
        ...data,
        [propData]: arrChecked
      })
    }
  }

  const returnCheckedMenu = (el) => 
    data[removeAccents(el._id)] && data[removeAccents(el._id)].length > 0 
      ? true
      : false
      
  const returnCheckedSubmenu = (el) => 
    data[removeAccents(paginaSelect._id)] 
      ? data[removeAccents(paginaSelect._id)].includes(el._id) 
        ? true 
        : false 
      : false

  const guardarPaginas = () => {
    let arrData = [];
    for (let value in data) {
      if (!data[value] || data[value].length === 0) continue;
      let arr = {
        ID_SEGURIDAD_PERFILES: perfil._id,
        ID_CONFIGURACION_SUBMENU: data[value],
        ID_CONFIGURACION_MENU: value,
      }
      arrData.push(arr)
    }

    setLoader(true)
    SaveRequestData({
      path: SEGURIDAD_PERFILES_MENU_SUBMENU_STORE,
      body: { PAGINAS_PERFIL: arrData, ID_PERFIL: perfil._id },
      fnRequest: SEGURIDAD_PERFILES_MENU_SUBMENU_STORE_AXIOS,
      success: (resp) => {
        setLoader(false)
        MessageUtil({ message: resp.statusText, type: 'success', seg: 10 })
        navigate(pathFront.PERFILES_ADMIN)
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: 'error', seg: 10 })
      }
    })
  }

  useEffect(() => {
    getPerfil()
    getPaginas();
  }, [getPaginas, getPerfil]);

  useEffect(() => {
    paginaSelect && getSubpaginas(paginaSelect._id);
  }, [paginaSelect]);

  useEffect(() => {
    perfil._id && getPaginasByPerfil(perfil._id);
  }, [perfil]);

  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Perfiles" />
      </Stack>
      <br />
      <Stack direction="row" spacing={2} alignItems="center">
        <Controls.TextComponent variant="text1">
          Nombre de Perfil
        </Controls.TextComponent>

        <Box sx={styleBox}>
          <Controls.TextComponent variant="text1">
            {perfil.NOMBRE_PERFIL}
          </Controls.TextComponent>
        </Box>
      </Stack>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Controls.TableComponents>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                {paginas.length > 0 ? (
                  paginas.map((el, index) => (
                    <TableRow 
                      role="checkbox" 
                      tabIndex={-1} key={index}
                      className={paginaSelect && paginaSelect._id === el._id ? "background-gris_500" : ""}
                    >
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="default"
                              checked={returnCheckedMenu(el)}
                              onChange={(e) => handleFormCheckedMenu(e, el)}
                            />
                          }
                        />
                        {el.NOMBRE_MENU}
                      </TableCell>
                      <TableCell>
                        <Controls.ButtonIconComponent
                          title="Sub Páginas"
                          icon={ICON.ARROW_RIGHT}
                          onClick={() => setPaginaSelect(el)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell colSpan={4} align="center">
                      Todavía no se insertó ningun registro
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Controls.TableComponents>
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} justifyContent="center" alignItems="center" >
          {data && paginaSelect ? (
            <Controls.TableComponents>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                  {subpaginas.length > 0 ? (
                    subpaginas.map((el, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox
                                aria-label="Checkbox demo"
                                color="default"
                                checked={returnCheckedSubmenu(el)}
                                onChange={(e) => handleFormCheckedSubmenu(e, el)}
                              />
                            }
                          />
                          {el.NOMBRE_SUBMENU}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell colSpan={4} align="center">
                        Todavía no se insertó ningun registro
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Controls.TableComponents>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...styleBox,
              }}
            >
              <Controls.TextComponent variant="text1">Selecciona una Página para comenzar</Controls.TextComponent>
            </Box>
          )}
        </Grid>
      </Grid>
      <br />
      <Stack direction="row" spacing={3} justifyContent="center">
        <Controls.ButtonComponent
          title="VOLVER"
          variant="secondary-normal"
          type="admin"
          icon={ICON.BACK}
          onClick={() => navigate(pathFront.PERFILES_ADMIN)}
        />
        <Controls.ButtonComponent
          title="Guardar"
          variant="primary-normal"
          type="admin"
          icon={ICON.SAVE}
          onClick={guardarPaginas}
        />
      </Stack>
    </Box>
  );
}
