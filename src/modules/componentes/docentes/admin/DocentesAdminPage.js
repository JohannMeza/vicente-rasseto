import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ButtonsSearchComponent from '../../../../components/utilComponents/ButtonsSearchComponent';
import { pathServer } from '../../../../config/router/path';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';
import { SaveRequestData, SaveRequestReport } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { SERVICES_POST } from '../../../../services/services.axios';
import { MessageUtil } from '../../../../util/MessageUtil';

const estadoList = [
  { label: "Activo", value: true },
  { label: "Inactivo", value: false }
]

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0,
};

const dataInitialFilter = {
  NOMBRE_USUARIO: "",
  EMAIL: "",
  DNI: "",
  ESTADO: true,
  PASSWORD: ""
}

export default function DocentesAdminPage () {
  const [open, setOpen] = useState(false);
  const [data, handleInputChange, resetData, setData] = useForm(dataInitialFilter)
  const [pagination, setPagination] = useState(paginate);
  const [docentes, setDocentes] = useState([]);
  const [isDataToEdit, setIsDataToEdit] = useState(null)
  const [listNivelEstudio, setListNivelEstudio] = useState([])
  const setLoader = useLoaderContext();

  const getDocentes = (rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.DOCENTES.INDEX,
      body: data,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        setDocentes(resp.data.docentes);
        setListNivelEstudio(resp.data.perfiles)
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const saveData = (dataEdit) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.DOCENTES.NEW,
      body: dataEdit,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        getDocentes()
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
        setIsDataToEdit(null)
        setOpen(false)
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const handleButtonEdit = (dataEdit) => {
    let { EMAIL } = dataEdit.ID_LOGIN
    setOpen(true)
    setIsDataToEdit({ ...dataEdit, EMAIL })
  }

  const reporteExcel = () => {
    setLoader(true)
    SaveRequestReport({
      path: pathServer.ADMINISTRACION.DOCENTES.REPORTE,
      body: data,
      success: () => setLoader(false),
      error: () => setLoader(false)
    })
  }

  useEffect(() => {
    getDocentes()
  }, [])

  return(
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={2}>
          <Controls.Title variant="h1" component="h1" title="Docentes" />
        </Grid>

        <Grid item xs={12} sm={12} md={10} lg={6} xl={5}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={3}>
              <Controls.ButtonComponent
                variant="primary-small"
                type="admin"
                title="Nuevo"
                onClick={() => setOpen(true)}
                style={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              <Controls.ButtonComponent
                variant="secondary-small"
                type="admin"
                title="Exportar"
                style={{ width: "100%" }}
                onClick={reporteExcel}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              <Controls.ButtonComponent
                variant="secondary-small"
                type="admin"
                title="Importar"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Box>
        <Controls.TextComponent variant="h3" component="div">Filtros de Búsqueda</Controls.TextComponent>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent 
              label="Nombre del Docente" 
              name="NOMBRE_USUARIO"
              value={data.NOMBRE_USUARIO}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent 
              label="Email" 
              name="EMAIL"
              value={data.EMAIL}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent 
              label="DNI del Docente" 
              name="DNI"
              value={data.DNI}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Estado" 
              name="ESTADO"
              list={estadoList}
              value={data.ESTADO}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent
          resetForm={() => resetData()}
          filterForm={() => getDocentes()}
        />
      </Box>
      <br />
      <Controls.TableComponents>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Operación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              docentes?.length > 0 ?
              docentes.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.NOMBRE_USUARIO}</TableCell>
                  <TableCell>{el.DNI}</TableCell>
                  <TableCell>{el.ID_LOGIN?.EMAIL}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Controls.ButtonIconComponent
                        title="Editar"
                        icon={ICON.EDIT}
                        onClick={() => handleButtonEdit(el)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell>Sin resultados de búsqueda</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Controls.TableComponents>

      <ModalDocente 
        open={open}
        setOpen={setOpen}
        isDataToEdit={isDataToEdit}
        setIsDataToEdit={setIsDataToEdit}
        saveData={saveData}
        listNivelEstudio={listNivelEstudio}
      />
    </Box>
  )
}

const dataInitial = {
  NOMBRE_USUARIO: "",
  EMAIL: "",
  DNI: "",
  ESTADO: true
}

const ModalDocente = ({ open, setOpen, isDataToEdit, setIsDataToEdit, saveData, listNivelEstudio }) => {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("NOMBRE_USUARIO" in fieldValues) {
      temp.NOMBRE_USUARIO = !fieldValues.NOMBRE_USUARIO ? "El campo Nombre del Docente es requerido" : "";
    } 

    if ("EMAIL" in fieldValues) {
      temp.EMAIL = !fieldValues.EMAIL ? "El campo Nivel de Estudio es requerido" : "";
    } 

    if ("DNI" in fieldValues) {
      temp.DNI = !fieldValues.DNI ? "El campo Nivel de Estudio es requerido" : "";
    } 

    if ("PASSWORD" in fieldValues) {
      temp.PASSWORD = !fieldValues.PASSWORD ? "El campo Contraseña es requerido" : "";
    } 

    if ("ESTADO" in fieldValues) {
      temp.ESTADO = typeof fieldValues.ESTADO !== "boolean" ? "El campo Estado es requerido" : "";
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }
  const {data, setData, errors, setErrors, handleInputFormChange, resetForm} = useFormValidation(dataInitial, true, validate);
  
  const closeModal = () => {
    resetForm()
    setIsDataToEdit(null)
    setOpen(false)
  }

  const handleClickSave = () => {
    if (validate()) {
      saveData(data)
    }
  }

  useEffect(() => {
    if (isDataToEdit) {
      setData(isDataToEdit)
    }
  }, [isDataToEdit])

  return (
    <Controls.Modal
    open={open}
    setOpen={closeModal}
    minWidth={600}
    fullWidth={true}
    maxWidth="sm"
    title={isDataToEdit ? "Editar Docente" : "Nuevo Docente"}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.InputComponent
            label="Nombre del Docente"
            name="NOMBRE_USUARIO"
            onChange={handleInputFormChange}
            error={errors.NOMBRE_USUARIO}
            value={data.NOMBRE_USUARIO}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.InputComponent
            label="Correo Eléctronico"
            name="EMAIL"
            onChange={handleInputFormChange}
            error={errors.EMAIL}
            value={data.EMAIL}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.InputComponent
            label="DNI del Docente"
            name="DNI"
            onChange={handleInputFormChange}
            error={errors.DNI}
            value={data.DNI}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.SelectComponent
            label="Estado"
            list={estadoList}
            name="ESTADO"
            onChange={handleInputFormChange}
            error={errors.ESTADO}
            value={data.ESTADO}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.InputComponent
            label="Ingrese contraseña nueva"
            list={estadoList}
            name="PASSWORD"
            onChange={handleInputFormChange}
            error={errors.PASSWORD}
            value={data.PASSWORD}
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
          onClick={closeModal}
        />
        <Controls.ButtonComponent
          title="Guardar"
          variant="primary-normal"
          type="admin"
          icon={ICON.SAVE}
          onClick={handleClickSave}
        />
      </Stack>
    </Controls.Modal>
  )
}