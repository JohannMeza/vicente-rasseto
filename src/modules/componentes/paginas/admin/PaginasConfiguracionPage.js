import {
  Box,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pathFront } from "../../../../config/router/pathFront";
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { pathServer } from "../../../../config/router/path";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { MessageUtil } from "../../../../util/MessageUtil";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import {
  SERVICES_POST,
  SERVICES_PUT,
} from "../../../../services/services.axios";
import { AlertUtilDelete } from "../../../../util/AlertUtil";
import { useForm } from "../../../../hooks/useForm";
import ButtonsSearchComponent from "../../../../components/utilComponents/ButtonsSearchComponent";

const columns = [
  { field: "NOMBRE_SUBMENU", headerName: "Nombre", width: 180 },
  { field: "NOMBRE_ICON", headerName: "Icono", width: 180 },
  { field: "PATH", headerName: "Ruta", width: 180 },
];

const paginate = {
  rowsPerPage: 5,
  page: 1,
  count: 0,
};

const dataInitialFilterModal = {
  NOMBRE_SUBMENU: null,
  PATH: null,
  ESTADO:  true
}

const dataInitialFilterTable = {
  NOMBRE_SUBMENU: null,
  PATH: null
}

const paginateSubpaginas = {
  rowsPerPage: 10,
  page: 0,
  count: 0,
};

const listEstado = [
  { label: "Activo", value: true },
  { label: "Inactivo", value: false },
]

export default function PaginasConfiguracionPage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [dataSubpaginas, setDataSubpaginas] = useState([]);
  const [pagination, setPagination] = useState(paginate);
  const [paginationSubpaginas, setPaginationSubpaginas] = useState(paginateSubpaginas);  
  const setLoader = useLoaderContext();
  const [dataIds, setDataIds] = useState([]);
  const [dataLocal, setDataLocal] = useState([]);
  const [dataLocalTable, setDataLocalTable] = useState([]);
  const [rutaBase, setRutaBase] = useState(null)
  const { id } = useParams();

  const [dataForm, handleInputChange, resetData] = useForm(dataInitialFilterModal)
  const [dataTableForm, handleInputChangeTable, resetDataTable] = useForm(dataInitialFilterTable)

  const closeModal = () => {
    setOpenModal(false);
    setPagination(paginate);
  };

  const getSubPaginas = (rowsPerPage = 5, page = 1) => {
    setLoader(true);
    setLoadingTable(true);
    SaveRequestData({
      path: pathServer.CONFIGURACION.SUBMENU.INDEX,
      body: dataForm,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        let arrSubpaginas = resp.data.map((el) => {
          return { ...el, id: el._id };
        });
        let { rowsPerPage, count, page } = resp;
        setDataSubpaginas(arrSubpaginas);
        setPagination({ rowsPerPage, count, page });
        setLoader(false);
        setLoadingTable(false);
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  const searchByIds = () => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.CONFIGURACION.SUBMENU.SEARCH_MULTI_IDS,
      body: { arrIds: dataIds },
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setDataLocal(resp.data);
        setDataLocalTable(resp.data);
        setLoader(false);
        closeModal();
        setPaginationSubpaginas({
          rowsPerPage: 10,
          count: resp.data.length,
          page: 0,
        });
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false);
      },
    });
  };

  const saveConfiguracion = () => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.CONFIGURACION.MENU.UPDATE_SUBMENUS + id,
      body: { arrSubmenus: dataIds },
      fnRequest: SERVICES_PUT,
      success: (resp) => {
        navigate(pathFront.ADMINISTRACION.PAGINAS.ADMIN);
        setLoader(false);
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false);
      },
    });
  };

  const searchSubPaginas = () => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.CONFIG_MENU.SEARCH_SUBPAGINAS + id,
      body: dataForm,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        let arrSubmenus = resp.data?.ID_CONFIGURACION_SUBMENU;
        setRutaBase(resp.data.PATH)        
        setDataLocal(arrSubmenus);
        setDataLocalTable(arrSubmenus);
        setDataIds(Array.from(arrSubmenus, (submenu) => submenu._id));
        setPaginationSubpaginas({
          rowsPerPage: 10,
          count: arrSubmenus.length,
          page: 0,
        });
        setLoader(false);
      },
      error: (err) => {
        setLoader(false);
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  const deleteSubmenu = (id) => {
    const config = {
      title: "¿Estás seguro?",
      text: "¡Al eliminar la página, no habrá vuelta atrás!",
      icon: "warning",
    };

    const fnDeleteSubPage = () => {
      const arrSubmenu = dataLocal.filter((el) => el.id ? el.id !== id : el._id !== id);
      const arrSubmenuTable = dataLocalTable.filter((el) => el.id ? el.id !== id : el._id !== id);
      const arrIdsSubmenu = dataIds.filter((el) => el !== id);
      setDataLocal(arrSubmenu);
      setDataLocalTable(arrSubmenuTable);
      setDataIds(arrIdsSubmenu);
      setPaginationSubpaginas({
        ...paginationSubpaginas,
        rowsPerPage: 10,
        count: arrSubmenu.length,
      });
    };

    AlertUtilDelete(fnDeleteSubPage, { config });
  };

  const filterSubmenusAdd = () => {
    let { PATH, NOMBRE_SUBMENU } = dataTableForm;
    PATH = new RegExp(PATH || '', "ig")
    NOMBRE_SUBMENU = new RegExp(NOMBRE_SUBMENU || '', "ig")
    let arrSubmenus = dataLocal.filter(el => el.PATH.match(PATH) && el.NOMBRE_SUBMENU.match(NOMBRE_SUBMENU))
    setDataLocalTable(arrSubmenus)
  }

  useEffect(() => {
    openModal && getSubPaginas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  useEffect(() => {
    searchSubPaginas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Configuración" />
      </Stack>
      <br />
      <Box>
        <Controls.TextComponent variant="h3" component="div">Filtros de Búsqueda</Controls.TextComponent>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent label="Nombre" name="NOMBRE_SUBMENU" value={dataTableForm.NOMBRE_SUBMENU} onChange={handleInputChangeTable} />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent label="Ruta" name="PATH" value={dataTableForm.PATH} onChange={handleInputChangeTable} />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent 
            resetForm={() => resetDataTable()}
            filterForm={() => filterSubmenusAdd()}
          />
      </Box>
      <br />
      <Controls.TableComponents
        pagination={paginationSubpaginas}
        setPagination={setPaginationSubpaginas}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Ruta</TableCell>
              <TableCell>Ruta Final</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>
                <Controls.ButtonComponent
                  title="AGREGAR"
                  variant="primary-small"
                  type="admin"
                  onClick={() => setOpenModal(true)}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataLocalTable?.length > 0 ? (
              dataLocalTable
                .slice(
                  paginationSubpaginas.page * paginationSubpaginas.rowsPerPage,
                  paginationSubpaginas.page * paginationSubpaginas.rowsPerPage +
                    paginationSubpaginas.rowsPerPage
                )
                .map((el, index) => (
                  <TableRow key={index}>
                    <TableCell>{el.NOMBRE_SUBMENU}</TableCell>
                    <TableCell>{el.PATH}</TableCell>
                    <TableCell>{rutaBase + el.PATH}</TableCell>
                    <TableCell>{el.NOMBRE_ICON}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
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
                <TableCell colSpan={4} align="center">
                  Todavía no se insertó ningun registro
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Controls.TableComponents>
      <br />
      <Stack direction="row" spacing={3} justifyContent="center">
        <Controls.ButtonComponent
          title="VOLVER"
          variant="secondary-normal"
          type="admin"
          icon={ICON.BACK}
          onClick={() => navigate(pathFront.ADMINISTRACION.PAGINAS.ADMIN)}
        />

        <Controls.ButtonComponent
          title={"Guardar"}
          variant="primary-normal"
          type="admin"
          icon={ICON.SAVE}
          onClick={() => saveConfiguracion()}
        />
      </Stack>

      <Controls.Modal
        open={openModal}
        setOpen={setOpenModal}
        title={"Agregar Sub Páginas"}
        fullWidth={true}
        maxWidth="md"
      >
        <Box>
          <Controls.TextComponent variant="h3" component="div">Filtros de Búsqueda</Controls.TextComponent>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3}>
              <Controls.InputComponent label="Nombre" name="NOMBRE_SUBMENU" value={dataForm.NOMBRE_SUBMENU} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Controls.InputComponent label="Ruta" name="PATH" value={dataForm.PATH} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
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

        <div style={{ height: 400, width: "100%" }}>
          <Controls.TableSelectionComponent
            rows={dataSubpaginas}
            columns={columns}
            pageSize={pagination}
            setPageSize={setPagination}
            loading={loadingTable}
            rowsPerPageOptions={[5, 10, 20]}
            onSelectionModelChange={(value) => setDataIds(value)}
            fnPagination={getSubPaginas}
            selectionModel={dataIds}
          />
        </div>
        <br />
        <Stack direction="row" spacing={3} justifyContent="center">
          <Controls.ButtonComponent
            title="VOLVER"
            variant="secondary-normal"
            type="admin"
            icon={ICON.BACK}
            onClick={() => closeModal()}
          />

          <Controls.ButtonComponent
            title={"Guardar"}
            variant="primary-normal"
            type="admin"
            icon={ICON.SAVE}
            onClick={() => searchByIds()}
          />
        </Stack>
      </Controls.Modal>
    </Box>
  );
}
