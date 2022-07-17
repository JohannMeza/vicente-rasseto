import { Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { SEGURIDAD_PERFILES_INDEX } from '../../../../config/router/path';
import { SEGURIDAD_PERFILES_INDEX_AXIOS } from '../../../../services/seguridad_perfiles.axios';
import { useNavigate } from 'react-router-dom'

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0
}

const dataInitial = {
  NOMBRE_PERFIL: ""
}

export default function PerfilesAdminPage () {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    if ("NOMBRE_PERFIL" in fieldValues) {
      temp.NOMBRE_PERFIL = fieldValues.NOMBRE_PERFIL === "" ? "El campo Nombre de Perfil es requerido" : ""
    } 
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === "");
    }
  }
  const [perfiles, setPerfiles] = useState([]);
  const [pagination, setPagination] = useState(paginate);  
  const [open, setOpen] = useState(false);
  const {data, errors, setErrors, handleInputFormChange} = useFormValidation(dataInitial, validate)
  const navigate = useNavigate();

  const getPerfiles = () => {
    SaveRequestData({
      path: SEGURIDAD_PERFILES_INDEX,
      body: {},
      fnRequest: SEGURIDAD_PERFILES_INDEX_AXIOS,
      success: (resp) => {
        setPerfiles(resp.data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  useEffect(() => {
    getPerfiles()
  }, [])

  return(
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Perfiles" />

        <Controls.ButtonComponent
          variant="primary-small"
          type="admin"
          title="Nuevo Perfil"
          onClick={() => setOpen(true)}
        />
      </Stack>

      <br />

      <Controls.TableComponents pagination={pagination} setPagination={setPagination} fnPagination={getPerfiles}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Usuarios Asignados</TableCell>
              <TableCell>Creado Por</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Operación</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {perfiles.length > 0 ? (
              perfiles.map((el, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{el.NOMBRE_PERFIL}</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>{el.createdAt}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Controls.ButtonIconComponent
                        title="Editar"
                        icon={ICON.EDIT}
                        onClick={() => navigate(`/admin/${el._id}`)}
                      />

                      <Controls.ButtonIconComponent
                        title="Eliminar"
                        icon={ICON.DELETE}
                      />

                      <Controls.ButtonComponent 
                        title="GESTIONAR PÁGINAS"
                        variant="secondary-small"
                        type="admin"
                        icon={ICON.DELETE}
                        onClick={() => navigate(`/seguridad/perfiles/${el._id}`)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell colSpan={5} align="center">
                  Todavía no se insertó ningun registro
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Controls.TableComponents>

      <Controls.Modal
        open={open}
        setOpen={setOpen}
        minWidth={600}
        fullWidth={true}
        maxWidth="sm"
        title="Nuevo Perfil"
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controls.InputComponent
              label="Nombre de la Sub Página"
              name="NOMBRE_SUBMENU"
              onChange={handleInputFormChange}
            />
          </Grid>
        </Grid>
        <br />
        <Stack direction="row" spacing={3} justifyContent="center">
          <Controls.ButtonComponent
            title="VOLVER"
            variant="secondary-normal"
            type="admin"
            icon={ICON.BACK}
            onClick={() => setOpen(false)}
          />
          <Controls.ButtonComponent
            title="Guardar"
            variant="primary-normal"
            type="admin"
            icon={ICON.SAVE}
          />
        </Stack>
      </Controls.Modal>
    </Box>
  )
}