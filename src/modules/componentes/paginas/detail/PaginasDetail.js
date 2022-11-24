// import React, { useEffect } from "react";
// import Controls from "../../../../framework/components/Controls";
// import { Stack, Grid } from "@mui/material";
// import { ICON } from "../../../../framework/components/icons/Icon";
// import { useFormValidation } from "../../../../hooks/useFormValidation";

// export default function PaginasDetailModalPage({
//   open,
//   setOpen,
//   listSubPaginas,
//   setListSubPaginas,
//   dataSubmenu,
//   setDataSubmenu,
//   id
// }) {
//   const dataInitial = {
//     ID_MENU: id,
//     PATH: "",
//     NOMBRE_SUBMENU: "",
//     NOMBRE_ICON: "",
//     _id: ""
//   };

//   const validate = (fieldValues = data) => {
//     let temp = { ...errors };
//     if ("PATH" in fieldValues) {
//       temp.PATH =
//         fieldValues.PATH === ""
//           ? "El campo Ruta de la Página es requerido"
//           : "";
//     }
//     if ("NOMBRE_SUBMENU" in fieldValues) {
//       temp.NOMBRE_SUBMENU =
//         fieldValues.NOMBRE_SUBMENU === ""
//           ? "El campo Nombre de la Sub Página es requerido"
//           : "";
//     }
//     if ("NOMBRE_ICON" in fieldValues) {
//       temp.NOMBRE_ICON =
//         fieldValues.NOMBRE_ICON === ""
//           ? "El campo Nombre del Icono es requerido"
//           : "";
//     }
//     setErrors({ ...temp });
//     if (fieldValues === data) {
//       return Object.values(temp).every((x) => x === "");
//     }
//   };

//   const { data, setData, errors, setErrors, handleInputFormChange, resetForm } =
//     useFormValidation(dataInitial, validate);

//   const addSubpagina = () => {
//     if (validate()) {
//       if (data._id || data.id) {
//         let arrSubPagina = []
//         if (data._id) {
//           arrSubPagina = listSubPaginas.map(el => el._id === data._id ? data : el)
//         }

//         if (data.id) {
//           arrSubPagina = listSubPaginas.map(el => el.id === data.id ? data : el)
//         }
//         setListSubPaginas(arrSubPagina)
//       } else {
//         setListSubPaginas([...listSubPaginas, {...data, id: Date.now().toString()}]);
//       }

//       setOpen(false);
//       resetForm();
//       setTimeout(() => {
//         setDataSubmenu(null);
//       }, 500)
//     }
//   };

//   const closeModal = () => {
//     setOpen(false);
//     resetForm()
//     setTimeout(() => {
//       setDataSubmenu(null);
//     }, 500)
//   };

//   useEffect(() => {
//     if (dataSubmenu) setData(dataSubmenu)
//   }, [dataSubmenu, setData]);

//   return (
//     <Controls.Modal
//       open={open}
//       setOpen={closeModal}
//       minWidth={600}
//       fullWidth={true}
//       maxWidth="sm"
//       title={dataSubmenu ? "Editar Sub Página" : "Nueva Sub Página"}
//     >
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Controls.InputComponent
//             label="Nombre de la Sub Página"
//             name="NOMBRE_SUBMENU"
//             value={data.NOMBRE_SUBMENU}
//             error={errors.NOMBRE_SUBMENU}
//             onChange={handleInputFormChange}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controls.InputComponent
//             label="Ruta de la Página"
//             name="PATH"
//             value={data.PATH}
//             error={errors.PATH}
//             onChange={handleInputFormChange}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controls.InputComponent
//             label="Nombre del Icono"
//             name="NOMBRE_ICON"
//             value={data.NOMBRE_ICON}
//             error={errors.NOMBRE_ICON}
//             onChange={handleInputFormChange}
//           />
//         </Grid>
//       </Grid>
//       <br />
//       <Stack direction="row" spacing={3} justifyContent="center">
//         <Controls.ButtonComponent
//           title="VOLVER"
//           variant="secondary-normal"
//           type="admin"
//           icon={ICON.BACK}
//           onClick={closeModal}
//         />
//         <Controls.ButtonComponent
//           title={dataSubmenu ? "Editar" : "Guardar"}
//           variant="primary-normal"
//           type="admin"
//           icon={ICON.SAVE}
//           onClick={addSubpagina}
//         />
//       </Stack>
//     </Controls.Modal>
//   );
// }

import { Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ButtonsSearchComponent from "../../../../components/utilComponents/ButtonsSearchComponent";
import { CONFIG_DELETE, CONFIG_INDEX, CONFIG_NEW, pathServer } from "../../../../config/router/path";
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useForm } from "../../../../hooks/useForm";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { listMenu, deleteMenu, saveMenu } from "../../../../services/configuracion_menu.axios";
import { SERVICES_POST } from "../../../../services/services.axios";
import { AlertUtilDelete, AlertUtilRelease } from "../../../../util/AlertUtil";
import { MessageUtil } from "../../../../util/MessageUtil";

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0
}

const dataInitialPaginas = {
  NOMBRE_MENU: null,
  NOMBRE_ICON: null,
  PATH: null,
  ESTADO: true
};

const dataInitialFilter = {
  NOMBRE_MENU: null,
  PATH: null,
  ESTADO: true
}

const listEstado = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
]

export default function PaginasDetail() {

  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("NOMBRE_MENU" in fieldValues) {
      temp.NOMBRE_MENU = !fieldValues.NOMBRE_MENU ? "El campo Nombre de la Página es requerido" : "";
    } 

    if ("NOMBRE_ICON" in fieldValues) {
      temp.NOMBRE_ICON = !fieldValues.NOMBRE_ICON ? "El campo Nombre Icono es requerido" : "";
    } 

    if ("PATH" in fieldValues) {
      temp.PATH = !fieldValues.PATH ? "El campo Ruta es requerido" : "";
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }

  const [paginas, setPaginas] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const {data, setData, errors, setErrors, handleInputFormChange, resetForm} = useFormValidation(dataInitialPaginas, true, validate)
  const [dataForm, handleDataFormChange, resetData] = useForm(dataInitialFilter)
  const [pagination, setPagination] = useState(paginate)
  const setLoader = useLoaderContext()

  const getPaginas = (rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: CONFIG_INDEX,
      body: dataForm,
      fnRequest: listMenu,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        setLoader(false)
        let {rowsPerPage, count, page} = resp;
        --page 
        setPaginas(resp.data);
        setPagination({rowsPerPage, count, page})
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  const agregarPagina = () => {
    setLoader(true);
    if (data._id) {
      SaveRequestData({ // editar
        path: pathServer.CONFIGURACION.MENU.NEW,
        body: {...data},
        fnRequest: SERVICES_POST,
        success: (resp) => {
          resetForm()
          getPaginas()
          MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
          setOpenModal(false)
          setLoader(false)
        },
        error: (err) => {
          resetForm()
          setLoader(false)
          MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        }
      })
    } else {
      SaveRequestData({ // save
        path: pathServer.CONFIGURACION.MENU.NEW,
        body: {...data},
        fnRequest: SERVICES_POST,
        success: (resp) => {
          resetForm()
          getPaginas()
          MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
          setOpenModal(false)
          setLoader(false)
        },
        error: (err) => {
          resetForm()
          setLoader(false)
          MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        }
      })
    }
  }

  const deletePagina = (id) => {
    const config = {
      title: '¿Estás seguro?',
      text: "Al eliminar la página, no habrá vuelta atrás!",
      icon: 'warning',
    }
    
    const fnRequestPage = () => {
      SaveRequestData({
        path: `${CONFIG_DELETE}/${id}`,
        body: {},
        fnRequest: deleteMenu,
        success: (resp) => {
          AlertUtilRelease({
            title: '¡Eliminado!',
            text: resp.statusText,
            icon: 'success',
          })

          getPaginas();
        },
        error: (err) => {
          MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        },
      })
    }
    
    AlertUtilDelete(fnRequestPage, { config })
  };

  const editarPagina = (el) => {
    setOpenModal(true)
    setData(el)
  }

  useEffect(() => {
    getPaginas()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box>
        <Stack direction="row" spacing={3}>
          <Controls.Title variant="h1" component="h1" title="Páginas" />

          <Controls.ButtonComponent
            variant="primary-small"
            type="admin"
            title="Nueva Página"
            onClick={() => setOpenModal(true)}
          />
        </Stack>
        
        <br />
        
        <Box>
          <Controls.TextComponent variant="h3" component="div">Filtros de Búsqueda</Controls.TextComponent>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Controls.InputComponent label="Nombre de la Página" name="NOMBRE_MENU" onChange={handleDataFormChange} value={dataForm.NOMBRE_MENU} />
            </Grid>
            <Grid item xs={3}>
              <Controls.InputComponent label="Ruta" name="PATH" onChange={handleDataFormChange} value={dataForm.PATH} />
            </Grid>
            <Grid item xs={3}>
              <Controls.SelectComponent label="Estado" list={listEstado} name="ESTADO" onChange={handleDataFormChange} value={dataForm.ESTADO} />
            </Grid>
          </Grid>
          <br />
          <ButtonsSearchComponent
            resetForm={resetData}
            filterForm={getPaginas}
          />
        </Box>

        <br />

        <Controls.TableComponents
          pagination={pagination}
          setPagination={setPagination}
          fnPagination={getPaginas}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Ruta</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Operación</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginas.length > 0 ? (
                paginas.map((el, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{el.NOMBRE_MENU}</TableCell>
                    <TableCell>{el.PATH}</TableCell>
                    <TableCell>{el.NOMBRE_ICON}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Controls.ButtonIconComponent
                          title="Editar"
                          icon={ICON.EDIT}
                          onClick={() => editarPagina(el)}
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
                    Todavía no se insertó ningun registro
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
        title={data._id ? "Editar Página" : "Agregar Nueva Página"}
        fullWidth={true}
        resetForm={resetForm}
        maxWidth="sm"
      >
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
          <Grid item xs={12}>
            <Controls.InputComponent
              label="Ruta Base"
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
              value={data.ESTADO}
              list={listEstado}
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
                onClick={() => agregarPagina()}
              />
            </Stack>
          </Grid>
        </Grid>
      </Controls.Modal>
    </>
  );
}
