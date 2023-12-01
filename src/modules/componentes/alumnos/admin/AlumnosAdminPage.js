import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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
  ID_NIVEL_ESTUDIO: "",
  ID_GRADO: "",
  ESTADO: true
}

export default function AlumnosAdminPage () {
  const [open, setOpen] = useState(false);
  const [data, handleInputChange, resetData, setData] = useForm(dataInitialFilter)
  const [pagination, setPagination] = useState(paginate);
  const [alumnos, setAlumnos] = useState([]);
  const [isDataToEdit, setIsDataToEdit] = useState(null)
  const [listNivelEstudio, setListNivelEstudio] = useState([])
  const [listGrados, setlistGrados] = useState([])
  const setLoader = useLoaderContext();

  const getAlumnos = (rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.ALUMNOS.INDEX,
      body: data,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        setAlumnos(resp.data.alumnos);
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
      path: pathServer.ADMINISTRACION.ALUMNOS.NEW,
      body: dataEdit,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        getAlumnos()
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

  const getGrados = (id) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.ALUMNOS.GRADOS_LABEL,
      body: { id },
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setlistGrados(resp.data)
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const handleChange = (e) => {
    if (e.target.name === "ID_NIVEL_ESTUDIO") {
      let { value } = e.target;
      getGrados(value)
    }
    
    handleInputChange(e)
  }

  const handleButtonEdit = (dataEdit) => {
    let { _id: ID_GRADO, ID_NIVEL_ESTUDIO } = dataEdit.ID_GRADO
    let { EMAIL } = dataEdit.ID_LOGIN
    setOpen(true)
    setIsDataToEdit({ ...dataEdit, ID_GRADO, ID_NIVEL_ESTUDIO: ID_NIVEL_ESTUDIO._id, EMAIL })
  }

  const reporteExcel = () => {
    setLoader(true)
    SaveRequestReport({
      path: pathServer.ADMINISTRACION.ALUMNOS.REPORTE,
      body: data,
      success: () => setLoader(false),
      error: () => setLoader(false)
    })
  }

  useEffect(() => {
    getAlumnos()
  }, [])

  useEffect(() => {
    setData({ ...data, ID_GRADO: "" })
  }, [data.ID_NIVEL_ESTUDIO])

  return(
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={2}>
          <Controls.Title variant="h1" component="h1" title="Alumnos" />
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
              label="Nombre del Estudiante" 
              name="NOMBRE_USUARIO"
              value={data.NOMBRE_USUARIO}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent 
              label="Email" 
              name="EMAIL"
              value={data.EMAIL}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent 
              label="DNI del Estudiante" 
              name="DNI"
              value={data.DNI}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Nivel Estudio" 
              list={listNivelEstudio}
              name="ID_NIVEL_ESTUDIO"
              value={data.ID_NIVEL_ESTUDIO}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Grado" 
              name="ID_GRADO"
              list={listGrados}
              value={data.ID_GRADO}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Estado" 
              name="ESTADO"
              list={estadoList}
              value={data.ESTADO}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent
          resetForm={() => resetData()}
          filterForm={() => getAlumnos()}
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
              <TableCell>Nivel Educativo</TableCell>
              <TableCell>Grado</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              alumnos?.length > 0 ?
              alumnos.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.NOMBRE_USUARIO}</TableCell>
                  <TableCell>{el.DNI}</TableCell>
                  <TableCell>{el.ID_LOGIN?.EMAIL}</TableCell>
                  <TableCell>{el.ID_GRADO?.ID_NIVEL_ESTUDIO?.NIVEL_ESTUDIO}</TableCell>
                  <TableCell>{el.ID_GRADO?.GRADO}</TableCell>
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

      <ModalAlumno 
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
  PASSWORD: "",
  ID_NIVEL_ESTUDIO: "",
  ID_GRADO: "",
  ESTADO: true
}

const ModalAlumno = ({ open, setOpen, isDataToEdit, setIsDataToEdit, saveData, listNivelEstudio }) => {
  const setLoader = useLoaderContext();
  const [listGrados, setlistGrados] = useState([])

  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("NOMBRE_USUARIO" in fieldValues) {
      temp.NOMBRE_USUARIO = !fieldValues.NOMBRE_USUARIO ? "El campo Nombre del Estudiante es requerido" : "";
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

    if ("ID_GRADO" in fieldValues) {
      temp.ID_GRADO = !fieldValues.ID_GRADO ? "El campo Nivel de Estudio es requerido" : "";
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

  const handleChange = (e) => {
    if (e.target.name === "ID_NIVEL_ESTUDIO") {
      let { value } = e.target;
      getGrados(value)
    }

    handleInputFormChange(e)
  }

  const getGrados = (id) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.ALUMNOS.GRADOS_LABEL,
      body: { id },
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setlistGrados(resp.data)
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const handleClickSave = () => {
    if (validate()) {
      saveData(data)
    }
  }

  useEffect(() => {
    if (isDataToEdit) {
      setData({...isDataToEdit})
      getGrados(isDataToEdit.ID_NIVEL_ESTUDIO)
    }
  }, [isDataToEdit])

 

  return (
    <Controls.Modal
    open={open}
    setOpen={closeModal}
    minWidth={600}
    fullWidth={true}
    maxWidth="sm"
    title={isDataToEdit ? "Editar Alumno" : "Nuevo Alumno"}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.InputComponent
            label="Nombre del Estudiante"
            name="NOMBRE_USUARIO"
            onChange={handleChange}
            error={errors.NOMBRE_USUARIO}
            value={data.NOMBRE_USUARIO}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.InputComponent
            label="Correo Eléctronico"
            name="EMAIL"
            onChange={handleChange}
            error={errors.EMAIL}
            value={data.EMAIL}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.InputComponent
            label="DNI del Estudiante"
            name="DNI"
            onChange={handleChange}
            error={errors.DNI}
            value={data.DNI}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.SelectComponent
            label="Nivel de Estudio"
            list={listNivelEstudio}
            name="ID_NIVEL_ESTUDIO"
            onChange={handleChange}
            error={errors.ID_NIVEL_ESTUDIO}
            value={data.ID_NIVEL_ESTUDIO}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.SelectComponent
            label="Grado"
            list={listGrados}
            name="ID_GRADO"
            onChange={handleChange}
            error={errors.ID_GRADO}
            value={data.ID_GRADO}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.SelectComponent
            label="Estado"
            list={estadoList}
            name="ESTADO"
            onChange={handleChange}
            error={errors.ESTADO}
            value={data.ESTADO}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Controls.InputComponent
            label="Ingrese contraseña nueva"
            name="PASSWORD"
            onChange={handleChange}
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