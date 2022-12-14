import { Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { pathServer } from '../../../../config/router/path';
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../../hooks/useForm';
import ButtonsSearchComponent from '../../../../components/utilComponents/ButtonsSearchComponent';
import { SERVICES_POST } from '../../../../services/services.axios';
import { MessageUtil } from '../../../../util/MessageUtil';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import ValidateData from '../../../../hooks/useValidateData';
import { pathFront } from '../../../../config/router/pathFront';
import useAuthContext from '../../../../hooks/useAuthContext';

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0
}

const dataInitial = {
  NOMBRE_PERFIL: "",
  IS_MANAGEABLE: true,
  ESTADO: true
}

const dataFormInitial = {
  NOMBRE_PERFIL: null,
  ESTADO: true
}

const estadoList = [
  { label: "Activo", value: true },
  { label: "Inactivo", value: false }
]

export default function PerfilesAdminPage () {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("NOMBRE_PERFIL" in fieldValues) {
      temp.NOMBRE_PERFIL = !fieldValues.NOMBRE_PERFIL ? "El campo Nombre de Perfil es requerido" : "";
    } 
    
    setErrors({...temp});

    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }

  const setLoader = useLoaderContext();
  const [perfiles, setPerfiles] = useState([]);
  const [pagination, setPagination] = useState(paginate);  
  const [open, setOpen] = useState(false);
  const {data, setData, errors, setErrors, handleInputFormChange, resetForm} = useFormValidation(dataInitial, true, validate)
  const [dataForm, handleInputChange, resetData] = useForm(dataFormInitial);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const getPerfiles = (rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.SEGURIDAD.PERFILES.INDEX,
      body: dataForm,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        let { rowsPerPage, count, page } = resp;
        --page;
        setPagination({ rowsPerPage, count, page });
        setPerfiles(resp.data)
        setLoader(false)
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 })
      }
    })
  }

  const savePerfil = () => {
    if (validate()) {
      setLoader(true)
      SaveRequestData({
        path: pathServer.SEGURIDAD.PERFILES.NEW,
        body: {...data, USER: user.userAccess.ID_PERFILES.NOMBRE_PERFIL },
        fnRequest: SERVICES_POST,
        success: (resp) => {
          getPerfiles()
          setOpen(false)
          resetForm()
          setLoader(false)
          MessageUtil({ message: resp.statusText, type: "success", seg: 10 })
        },
        error: (err) => {
          resetForm()
          setOpen(false)
          setLoader(false)
          MessageUtil({ message: err.statusText, type: "error", seg: 10 })
        }
      })
    }
  }

  const closeModal = () => {
    setOpen(false)
    resetForm()
  }

  const updatePerfil = (el) => {
    setOpen(true)
    setData(el)
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
      
      <Box>
        <Controls.TextComponent variant="h3" component="div">Filtros de Búsqueda</Controls.TextComponent>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent label="Nombre" name="NOMBRE_PERFIL" value={dataForm.NOMBRE_PERFIL} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent label="Estado" name="ESTADO" list={estadoList} value={dataForm.ESTADO} onChange={handleInputChange} />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent
          resetForm={() => resetData()}
          filterForm={() => getPerfiles()}
        />
      </Box>

      <br />

      <Controls.TableComponents 
        pagination={pagination} 
        setPagination={setPagination} 
        fnPagination={getPerfiles}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Administrable</TableCell>
              <TableCell>Operación</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {perfiles.length > 0 ? (
              perfiles.map((el, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{el.NOMBRE_PERFIL}</TableCell>
                  <TableCell>{el.IS_MANAGEABLE ? "Administrable" : "No Administrable"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Controls.ButtonIconComponent
                        title="Editar"
                        disabled={el.IS_MANAGEABLE || user.userAccess.ADMIN ? false : true}
                        icon={ICON.EDIT}
                        onClick={() => updatePerfil(el)}
                      />

                      <Controls.ButtonIconComponent
                        title="Eliminar"
                        icon={ICON.DELETE}
                      />

                      <Controls.ButtonComponent
                        title={"CONFIGURAR"}
                        variant="secondary-small"
                        disabled={el.IS_MANAGEABLE || user.userAccess.ADMIN ? false : true}
                        type="admin"
                        onClick={() => navigate(pathFront.PERFILES_CONFIG + el._id)}
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
        setOpen={closeModal}
        minWidth={600}
        fullWidth={true}
        maxWidth="sm"
        title="Nuevo Perfil"
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controls.InputComponent
              label="Nombre de la Sub Página"
              name="NOMBRE_PERFIL"
              onChange={handleInputFormChange}
              disabled={data.IS_MANAGEABLE || user.userAccess.ADMIN ? false : true}
              value={data.NOMBRE_PERFIL}
              error={errors.NOMBRE_PERFIL}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.SelectComponent
              label="Estado"
              list={estadoList}
              disabled={data.IS_MANAGEABLE || user.userAccess.ADMIN ? false : true}
              name="ESTADO"
              value={data.ESTADO}
              onChange={handleInputFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.SelectComponent
              label="Administrable"
              list={estadoList}
              disabled={data.IS_MANAGEABLE && user.userAccess.ADMIN ? false : true}
              name="IS_MANAGEABLE"
              value={data.IS_MANAGEABLE}
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
            onClick={() => closeModal()}
          />
          <Controls.ButtonComponent
            title="Guardar"
            variant="primary-normal"
            type="admin"
            icon={ICON.SAVE}
            onClick={() => savePerfil()}
          />
        </Stack>
      </Controls.Modal>
    </Box>
  )
}