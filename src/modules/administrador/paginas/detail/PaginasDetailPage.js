import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Stack,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import Controls from "../../../../framework/components/Controls";
import { useNavigate, useParams } from "react-router-dom";
import { ICON } from "../../../../framework/components/icons/Icon";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import {
  saveMenu,
  showMenu,
} from "../../../../services/configuracion_menu.axios";
import { CONFIG, CONFIG_SHOW } from "../../../../config/router/path";
import { MessageUtil } from "../../../../util/MessageUtil";
import PaginasDetailModalPage from "./PaginasDetailModalPage";
import { AlertUtilDelete } from "../../../../util/AlertUtil";
import useLoaderContext from "../../../../hooks/useLoaderContext";

const dataInitial = {
  NOMBRE_MENU: "",
  NOMBRE_ICON: "",
};

export default function PaginasAdminPage() {
  const validate = (fieldValues = data) => {
    let temp = { ...errors };
    if ("NOMBRE_MENU" in fieldValues) {
      temp.NOMBRE_MENU =
        fieldValues.NOMBRE_MENU === ""
          ? "El campo Nombre de la Página es requerido"
          : "";
    }
    if ("NOMBRE_ICON" in fieldValues) {
      temp.NOMBRE_ICON =
        fieldValues.NOMBRE_ICON === ""
          ? "El campo Nombre del Icono es requerido"
          : "";
    }
    setErrors({ ...temp });
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { data, setData, errors, setErrors, handleInputFormChange } = useFormValidation(dataInitial, validate);
  const [dataSubmenu, setDataSubmenu] = useState(null);
  const [listSubPaginas, setListSubPaginas] = useState([]);
  const setLoader = useLoaderContext()

  const save = () => {
    if (validate()) {
      setLoader(true)
      SaveRequestData({
        path: CONFIG,
        body: { ...data, SUBMENUS: listSubPaginas },
        fnRequest: saveMenu,
        success: (resp) => {
          setLoader(false)
          navigate("/administrador/paginas/admin");
          MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
        },
        error: (err) => {
          MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        },
      });
    }
  };

  const getPage = useCallback(() => {
    SaveRequestData({
      path: `${CONFIG_SHOW}${id}`,
      body: {},
      fnRequest: showMenu,
      success: (resp) => {
        console.log(resp)
        setData(resp.data.menu);
        setListSubPaginas(resp.data.submenu);
      },
      error: (err) => {
        navigate("/administrador/paginas/admin");
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  }, [id, navigate, setData]);

  const updateSubmenu = (data) => {
    setDataSubmenu({ ...data });
    setOpen(true);
  };

  const deleteSubmenu = (id) => {
    const config = {
      title: '¿Estás seguro?',
      text: "Al eliminar la página, no habrá vuelta atrás!",
      icon: 'warning',
    }

    const fnDeleteSubPage = () => {
      const arrSubmenu = listSubPaginas.filter((el) => el.id ? el.id !== id : el._id !== id);
      setListSubPaginas(arrSubmenu);
    }
    
    AlertUtilDelete(fnDeleteSubPage, { config })
  };

  useEffect(() => {
    if (id) {
      getPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Páginas" />
      </Stack>

      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Controls.Card title={id ? "Editar Página" : "Nueva Página"}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controls.InputComponent
                  label="Nombre de la página"
                  name="NOMBRE_MENU"
                  value={data.NOMBRE_MENU}
                  onChange={handleInputFormChange}
                  error={errors.NOMBRE_MENU}
                />
              </Grid>
              <Grid item xs={12}>
                <Controls.InputComponent
                  label="Nombre del icono"
                  name="NOMBRE_ICON"
                  value={data.NOMBRE_ICON}
                  onChange={handleInputFormChange}
                  error={errors.NOMBRE_ICON}
                />
              </Grid>
            </Grid>
          </Controls.Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Stack direction="row" spacing={3}>
            <Controls.TextComponent variant="text1" component="span">
              Sub Página
            </Controls.TextComponent>
            <Controls.ButtonComponent
              variant="primary-small"
              type="admin"
              title="Nueva Sub Página"
              onClick={() => setOpen(true)}
            />
          </Stack>

          <br />

          <Controls.TableComponents>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Ruta</TableCell>
                  <TableCell>Icono</TableCell>
                  <TableCell>Operación</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listSubPaginas.length > 0 ? (
                  listSubPaginas.map((el, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{el.NOMBRE_SUBMENU}</TableCell>
                      <TableCell>{el.NOMBRE_ICON}</TableCell>
                      <TableCell>{el.PATH}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Controls.ButtonIconComponent
                            title="Editar"
                            icon={ICON.EDIT}
                            onClick={() => updateSubmenu(el)}
                          />

                          <Controls.ButtonIconComponent
                            title="Eliminar"
                            icon={ICON.DELETE}
                            onClick={() => deleteSubmenu(el.id || el._id)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell colSpan={4} align="center">Todavía no se insertó ningun registro</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Controls.TableComponents>
        </Grid>
      </Grid>

      <br />

      <Stack direction="row" spacing={3} justifyContent="center">
        <Controls.ButtonComponent
          title="VOLVER"
          variant="secondary-normal"
          type="admin"
          icon={ICON.BACK}
          onClick={() => navigate("/administrador/paginas/admin")}
        />
        <Controls.ButtonComponent
          title={id ? "Actualizar" : "Guardar"}
          variant="primary-normal"
          type="admin"
          icon={ICON.SAVE}
          onClick={save}
        />
      </Stack>

      <PaginasDetailModalPage
        open={open}
        setOpen={setOpen}
        listSubPaginas={listSubPaginas}
        setListSubPaginas={setListSubPaginas}
        dataSubmenu={dataSubmenu}
        setDataSubmenu={setDataSubmenu}
        id={id}
      />
    </Box>
  );
}
