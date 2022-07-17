import {
  Box,
  Stack,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG_DELETE, CONFIG_INDEX } from "../../../../config/router/path";
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { listMenu, deleteMenu } from "../../../../services/configuracion_menu.axios";
import { MessageUtil } from "../../../../util/MessageUtil";
import { AlertUtilDelete, AlertUtilRelease } from "../../../../util/AlertUtil";
import useLoaderContext from "../../../../hooks/useLoaderContext";

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0
}

const PaginasAdminPage = () => {
  const navigate = useNavigate();
  const [paginas, setPaginas] = useState([]);
  const [pagination, setPagination] = useState(paginate)
  const setLoader = useLoaderContext()

  const getPaginas = useCallback((rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: CONFIG_INDEX,
      body: {},
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
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  },[setLoader]);

  const deletePagina = (id) => {
    const config = {
      title: '¿Estás seguro?',
      text: "Al eliminar la página, no habrá vuelta atrás!",
      icon: 'warning',
    }
    
    const fnRequestPage = () => {
      SaveRequestData({
        path: `${CONFIG_DELETE}${id}`,
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

  useEffect(() => {
    getPaginas();
  }, [getPaginas]);

  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Páginas" />

        <Controls.ButtonComponent
          variant="primary-small"
          type="admin"
          title="Nueva Página"
          onClick={() => navigate("/administrador/paginas/new")}
        />
      </Stack>

      <br />

      <Controls.TableComponents pagination={pagination} setPagination={setPagination} fnPagination={getPaginas}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Operación</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginas.length > 0 ? (
              paginas.map((el, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{el.NOMBRE_MENU}</TableCell>
                  <TableCell>{el.NOMBRE_ICON}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Controls.ButtonIconComponent
                        title="Editar"
                        icon={ICON.EDIT}
                        onClick={() =>
                          navigate(`/administrador/paginas/${el._id}`)
                        }
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
  );
}

export default PaginasAdminPage