import { Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonsSearchComponent from '../../../../components/utilComponents/ButtonsSearchComponent';
import { CONFIG_INDEX, pathServer } from '../../../../config/router/path';
import { pathFront } from '../../../../config/router/pathFront';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { listMenu, searchSubpaginas } from '../../../../services/configuracion_menu.axios';
import { SERVICES_POST } from '../../../../services/services.axios';
import { MessageUtil } from '../../../../util/MessageUtil';

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0
}

const paginateSubpaginas = {
  rowsPerPage: 10,
  page: 0,
  count: 0
}

const dataInitialFilter = {
  NOMBRE_MENU: null,
  PATH: null,
  ESTADO: true
}

const listEstado = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
]

export default function PaginasDetailConfiguracion () {
  const [pagination, setPagination] = useState(paginate)
  const [paginationSubpaginas, setPaginationSubpaginas] = useState(paginateSubpaginas)
  const setLoader = useLoaderContext()
  const [paginas, setPaginas] = useState([])
  const [subpaginas, setSubpaginas] = useState([])
  const [idPaginaSelect, setIdPaginaSelect] = useState(false)
  const [dataForm, handleDataFormChange, resetData] = useForm(dataInitialFilter)

  const navigate = useNavigate();

  const getPaginas = (rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: CONFIG_INDEX,
      body: dataForm,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        setLoader(false)
        let {rowsPerPage, count, page} = resp;
        --page;
        setPaginas(resp.data);
        setPagination({rowsPerPage, count, page})
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    })
  }

  const searchSubPaginas = (idPagina) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.CONFIG_MENU.SEARCH_SUBPAGINAS + idPagina,
      body: {},
      fnRequest: SERVICES_POST,
      success: (resp) => {
        let arrSubpaginas = resp.data?.ID_CONFIGURACION_SUBMENU;
        setSubpaginas(arrSubpaginas)
        setPaginationSubpaginas({rowsPerPage: 10, count: arrSubpaginas.length, page: 0})
        setIdPaginaSelect(idPagina)
        setLoader(false)
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  const redirecConfiguracion = () => {
    idPaginaSelect && navigate(pathFront.ADMINISTRACION.PAGINAS.CONFIGURACION+idPaginaSelect)
  }

  useEffect(() => {
    getPaginas()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Páginas" />
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

      <Grid container direction="row" spacing={3}>
        <Grid item xs={6}>
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
                  <TableCell>Operación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {paginas.length > 0 ? (
                paginas.map((el, index) => (
                  <TableRow 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={index} 
                    className={idPaginaSelect && idPaginaSelect === el._id ? "background-gris_500" : ""}
                  >
                    <TableCell>{el.NOMBRE_MENU}</TableCell>
                    <TableCell>{el.PATH}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Controls.ButtonIconComponent
                          title="Ver"
                          icon={ICON.PASS_VISIBLE}
                          onClick={() => searchSubPaginas(el._id)}
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
        </Grid> 
        
        <Grid item xs={6}>
          <Controls.TableComponents
            pagination={paginationSubpaginas}
            setPagination={setPaginationSubpaginas}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Ruta</TableCell>
                  <TableCell>
                    <Controls.ButtonComponent 
                      title="configurar"
                      variant="primary-small"
                      type="admin"
                      icon={ICON.SAVE}
                      onClick={() => redirecConfiguracion()}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {subpaginas.length > 0 ? (
                subpaginas.slice(
                  paginationSubpaginas.page * paginationSubpaginas.rowsPerPage,
                  paginationSubpaginas.page * paginationSubpaginas.rowsPerPage +
                    paginationSubpaginas.rowsPerPage
                ).map((el, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{el.NOMBRE_SUBMENU}</TableCell>
                    <TableCell>{el.PATH}</TableCell>
                    <TableCell></TableCell>
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
      </Grid>
    </Box>
  )
}