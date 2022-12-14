import { Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonsSearchComponent from "../../../../components/utilComponents/ButtonsSearchComponent";
import { pathServer } from "../../../../config/router/path";
import { pathFront } from '../../../../config/router/pathFront';
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useForm } from "../../../../hooks/useForm";
import { useFormValidation } from '../../../../hooks/useFormValidation';
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { SERVICES_PUT, SERVICES_POST } from "../../../../services/services.axios";
import { AlertUtilDelete, AlertUtilRelease } from '../../../../util/AlertUtil';
import { MessageUtil } from "../../../../util/MessageUtil";

const dataInitialFilter = {
  NIVEL_ESTUDIO: "",
  ESTADO: true,
};

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0,
};

const estadoList = [
  { label: "Activo", value: true },
  { label: "Inactivo", value: false }
]

export default function NivelEstudioDetail () {
  const [dataForm, handleDataFormChange, resetData] = useForm(dataInitialFilter);
  const [isDataToEdit, setIsDataToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState(paginate);
  const [nivelEstudio, setNivelEstudio] = useState([]);
  const setLoader = useLoaderContext();
  const navigate = useNavigate()

  const getNivelEstudio = (rowsPerPage = 10, page = 1) => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ADMINISTRACION.NIVEL_ESTUDIO.INDEX,
      body: dataForm,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        setLoader(false);
        let { rowsPerPage, count, page } = resp;
        --page;
        setNivelEstudio(resp.data);
        setPagination({ rowsPerPage, count, page });
      },
      error: (err) => {
        setLoader(false);
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  const saveNivelEstudio = (dataSave) => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ADMINISTRACION.NIVEL_ESTUDIO.NEW,
      body: dataSave,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setLoader(false);
        getNivelEstudio()
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
      },
      error: (err) => {
        setLoader(false);
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  }

  const handleClickEdit = (dataEdit) => {
    setIsDataToEdit(dataEdit)
    setOpen(true)
  }

  useEffect(() => {
    getNivelEstudio();
  }, []);
  
  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Nivel Estudio" />

        <Controls.ButtonComponent
          variant="primary-small"
          type="admin"
          title="Nuevo"
          onClick={() => setOpen(true)}
        />
      </Stack>
      <br />
      <Box>
        <Controls.TextComponent variant="h3" component="div">Filtros de Búsqueda</Controls.TextComponent>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent 
              label="Nivel Estudio" 
              name="NIVEL_ESTUDIO"
              onChange={handleDataFormChange}
              value={dataForm.NIVEL_ESTUDIO}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Estado" 
              list={estadoList}
              name="ESTADO"
              onChange={handleDataFormChange}
              value={dataForm.ESTADO}
            />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent resetForm={resetData} filterForm={getNivelEstudio} />
      </Box>
      <br />
      <Controls.TableComponents
        pagination={pagination}
        setPagination={setPagination}
        fnPagination={getNivelEstudio}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nivel Estudio</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nivelEstudio?.length > 0 ? (
              nivelEstudio.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.NIVEL_ESTUDIO}</TableCell>
                  <TableCell>{el.ESTADO ? 'Activo' : 'Inactivo' }</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Controls.ButtonIconComponent
                        title="Editar"
                        icon={ICON.EDIT}
                        onClick={() => handleClickEdit(el)}
                      />
                      <Controls.ButtonComponent
                        variant="secondary-small"
                        type="admin"
                        title="configurar"
                        onClick={() => navigate(pathFront.NIVEL_ESTUDIO_ADMIN_CONFIG + el._id)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>  
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center" }}>Sin Filas</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <ModalNivelEstudioSave
          open={open}
          setOpen={setOpen}
          saveNivelEstudio={saveNivelEstudio}
          isDataToEdit={isDataToEdit}
          setIsDataToEdit={setIsDataToEdit}
        />
      </Controls.TableComponents>    
    </Box>
  )
}

const ModalNivelEstudioSave = ({ open, setOpen, saveNivelEstudio, isDataToEdit, setIsDataToEdit }) => {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("NIVEL_ESTUDIO" in fieldValues) {
      temp.NIVEL_ESTUDIO = !fieldValues.NIVEL_ESTUDIO ? "El campo Nivel de Estudio es requerido" : "";
    } 

    if ("ESTADO" in fieldValues) {
      temp.ESTADO = typeof fieldValues.ESTADO !== "boolean" ? "El campo Estado es requerido" : "";
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }

  const {data, setData, errors, setErrors, handleInputFormChange, resetForm} = useFormValidation(dataInitialFilter, true, validate);
  const closeModal = () => {
    resetForm()
    setOpen(false)
    setIsDataToEdit(null)
  }

  const guardarDatos = () => {
    if (validate()) {
      saveNivelEstudio(data)
      setIsDataToEdit(null)
    }
  }

  useEffect(() => {
    if (isDataToEdit) {
      setData(isDataToEdit)
    }
  }, [isDataToEdit, setData])

  return (
    <Controls.Modal
    open={open}
    setOpen={closeModal}
    minWidth={600}
    fullWidth={true}
    maxWidth="sm"
    title="Nuevo Nivel Estudio"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controls.InputComponent
            label="Nivel Estudio"
            name="NIVEL_ESTUDIO"
            onChange={handleInputFormChange}
            error={errors.NIVEL_ESTUDIO}
            value={data.NIVEL_ESTUDIO}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.SelectComponent
            label="Estado"
            list={estadoList}
            name="ESTADO"
            onChange={handleInputFormChange}
            error={errors.ESTADO}
            value={data.ESTADO}
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
          onClick={() => guardarDatos()}
        />
      </Stack>
    </Controls.Modal>
  )
}