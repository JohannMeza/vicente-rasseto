import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonsSearchComponent from "../../../../components/utilComponents/ButtonsSearchComponent";
import { CONFIG_SUBMENU_INDEX, CONFIG_SUBMENU_NEW, CONFIG_SUBMENU_DELETE } from "../../../../config/router/path";
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useForm } from "../../../../hooks/useForm";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import {deleteSubmenu, listSubmenu, saveSubmenu} from "../../../../services/configuracion_submenu.axios";
import { AlertUtilDelete, AlertUtilRelease } from "../../../../util/AlertUtil";
import { MessageUtil } from "../../../../util/MessageUtil";

const dataInitialSubPaginas = {
  NOMBRE_SUBMENU: null,
  NOMBRE_ICON: null,
  PATH: null,
  ESTADO:  true
};

const dataInitialFilter = {
  NOMBRE_SUBMENU: null,
  PATH: null,
  ESTADO:  true
}

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0
}

const listEstado = [
  { label: "Activo", value: true },
  { label: "Inactivo", value: false },
]

export default function SubpaginasDetail() {
  const [paginas, setPaginas] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const {data, setData, errors, handleInputFormChange, resetForm} = useFormValidation(dataInitialSubPaginas, true)
  const [dataForm, handleInputChange, resetData] = useForm(dataInitialFilter)
  const [pagination, setPagination] = useState(paginate)
  const setLoader = useLoaderContext()

  const getSubPaginas = (rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: CONFIG_SUBMENU_INDEX,
      body: dataForm,
      fnRequest: listSubmenu,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        let {rowsPerPage, count, page} = resp;
        --page 
        setPaginas(resp.data);
        setPagination({rowsPerPage, count, page})
        setLoader(false)
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  const guardarSubpaginas = () => {
    setLoader(true)
    SaveRequestData({
      path: CONFIG_SUBMENU_NEW,
      body: {...data},
      fnRequest: saveSubmenu,
      success: (resp) => {
        getSubPaginas()
        setOpenModal(false)
        resetForm()
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      },
    });
  }

  const actualizarSubmenus = (submenu) => {
    setData(submenu)
    setOpenModal(true)
  }

  const deletePagina = (id) => {
    const config = {
      title: '??Est??s seguro?',
      text: "Al eliminar la p??gina, no habr?? vuelta atr??s!",
      icon: 'warning',
    }
    
    const fnRequestPage = () => {
      SaveRequestData({
        path: `${CONFIG_SUBMENU_DELETE}/${id}`,
        body: {},
        fnRequest: deleteSubmenu,
        success: (resp) => {
          AlertUtilRelease({
            title: '??Eliminado!',
            text: resp.statusText,
            icon: 'success',
          })
          getSubPaginas();
        },
        error: (err) => {
          MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        },
      })
    }
    
    AlertUtilDelete(fnRequestPage, { config })
  };

  useEffect(() => {
    getSubPaginas()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <Box>
        <Stack direction="row" spacing={3}>
          <Controls.Title variant="h1" component="h1" title="Sub P??ginas" />

          <Controls.ButtonComponent
            variant="primary-small"
            type="admin"
            title="Nueva Sub P??gina"
            onClick={() => setOpenModal(true)}
          />
        </Stack>

        <br />
        
        <Box>
          <Controls.TextComponent variant="h3" component="div">Filtros de B??squeda</Controls.TextComponent>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Controls.InputComponent label="Nombre" name="NOMBRE_SUBMENU" value={dataForm.NOMBRE_SUBMENU} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={3}>
              <Controls.InputComponent label="Ruta" name="PATH" value={dataForm.PATH} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={3}>
              <Controls.SelectComponent label="Estado" name="ESTADO" list={listEstado} value={dataForm.ESTADO} onChange={handleInputChange} />
            </Grid>
          </Grid>
          <br />
          <ButtonsSearchComponent 
            resetForm={() => resetData()}
            filterForm={() => getSubPaginas()}
          />
        </Box>

        <br />

        <Controls.TableComponents
          pagination={pagination}
          setPagination={setPagination}
          fnPagination={getSubPaginas}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Ruta</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Operaci??n</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginas.length > 0 ? (
                paginas.map((el, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{el.NOMBRE_SUBMENU}</TableCell>
                    <TableCell>{el.PATH}</TableCell>
                    <TableCell>{el.NOMBRE_ICON}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Controls.ButtonIconComponent
                          title="Editar"
                          icon={ICON.EDIT}
                          onClick={() => actualizarSubmenus(el)}
                        />

                        <Controls.ButtonIconComponent
                          title="Eliminar"
                          icon={ICON.DELETE}
                          onClick={() => deletePagina(el._id)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell colSpan={4} align="center">
                    Todav??a no se insert?? ningun registro
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Controls.TableComponents>
      </Box>
      <Controls.Modal
        open={openModal}
        setOpen={setOpenModal}
        title={data._id ? "Editar Sub P??gina" : "Agregar Nueva Sub P??gina"}
        resetForm={resetForm}
        fullWidth={true}
        maxWidth="sm"
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controls.InputComponent
              label="Nombre de la p??gina"
              name="NOMBRE_SUBMENU"
              value={data.NOMBRE_SUBMENU}
              onChange={handleInputFormChange}
              error={errors.NOMBRE_SUBMENU}
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
          <Grid item xs={12}>
            <Controls.InputComponent
              label="Nombre de la ruta"
              name="PATH"
              value={data.PATH}
              onChange={handleInputFormChange}
              error={errors.PATH}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.SelectComponent
              label="Estado"
              name="ESTADO"
              list={listEstado}
              value={data.ESTADO}
              onChange={handleInputFormChange}
              error={errors.ESTADO}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Controls.ButtonComponent
                title="VOLVER"
                variant="secondary-normal"
                type="admin"
                icon={ICON.BACK}
                onClick={() => setOpenModal(false)}
              />
              <Controls.ButtonComponent
                title={data._id ? "Editar" : "Guardar"}
                variant="primary-normal"
                type="admin"
                icon={ICON.SAVE}
                onClick={() => guardarSubpaginas()}
              />
            </Stack>
          </Grid>
        </Grid>
      </Controls.Modal>
    </>
  );
}
