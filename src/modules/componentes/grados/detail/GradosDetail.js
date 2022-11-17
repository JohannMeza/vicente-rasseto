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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonsSearchComponent from "../../../../components/utilComponents/ButtonsSearchComponent";
import { pathServer } from "../../../../config/router/path";
import { pathFront } from "../../../../config/router/pathFront";
import Controls from "../../../../framework/components/Controls";
import { ICON } from "../../../../framework/components/icons/Icon";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useForm } from "../../../../hooks/useForm";
import { useFormValidation } from "../../../../hooks/useFormValidation";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { SERVICES_POST } from "../../../../services/services.axios";
import { MessageUtil } from "../../../../util/MessageUtil";

const dataInitialFilter = {
  GRADO: "",
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

export default function GradosDetail() {
  const [dataForm, handleDataFormChange, resetData] = useForm(dataInitialFilter);
  const [pagination, setPagination] = useState(paginate);
  const [grados, setGrados] = useState([]);
  const setLoader = useLoaderContext();
  const [open, setOpen] = useState(false)
  const [isDataToEdit, setIsDataToEdit] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate();

  const getGrados = (rowsPerPage = 10, page = 1) => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ADMINISTRACION.GRADOS.INDEX + id,
      body: dataForm,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        setLoader(false);
        let { rowsPerPage, count, page } = resp;
        --page;
        setGrados(resp.data);
        setPagination({ rowsPerPage, count, page });
      },
      error: (err) => {
        setLoader(false);
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  };

  const saveGrado = (dataSave) => {
    setLoader(true);
    SaveRequestData({
      path: pathServer.ADMINISTRACION.GRADOS.NEW + id ,
      body: dataSave,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        setLoader(false);
        setOpen(false);
        getGrados()
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
      },
      error: (err) => {
        setLoader(false);
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      },
    });
  }

  useEffect(() => {
    getGrados();
  }, []);

  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Grados" />

        <Controls.ButtonComponent
          variant="primary-small"
          type="admin"
          title="Nuevo Grado"
          onClick={() => setOpen(true)}
        />
      </Stack>
      <br />
      <Box>
        <Controls.TextComponent variant="h3" component="div">
          Filtros de Búsqueda
        </Controls.TextComponent>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Controls.InputComponent 
              label="Grados" 
              name="GRADO"
              value={dataForm.GRADO}
              onChange={handleDataFormChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Controls.SelectComponent 
              label="Estado"
              name="ESTADO"
              list={estadoList}
              value={dataForm.ESTADO}
              onChange={handleDataFormChange}
            />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent resetForm={resetData} filterForm={getGrados} />
      </Box>
      <br />
      <Controls.TableComponents
        pagination={pagination}
        setPagination={setPagination}
        fnPagination={getGrados}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Grado</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grados?.length > 0 ? (
              grados.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.GRADO}</TableCell>
                  <TableCell>{el.ESTADO ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>
                   <Stack direction="row" spacing={1}>
                      <Controls.ButtonIconComponent
                        title="Ver"
                        icon={ICON.EDIT}
                      />
                      <Controls.ButtonIconComponent
                        title="Ver"
                        icon={ICON.DELETE}
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
      </Controls.TableComponents>
      <br />
      <Stack direction="row" spacing={3} justifyContent="center">
        <Controls.ButtonComponent
          title="VOLVER"
          variant="secondary-normal"
          type="admin"
          icon={ICON.BACK}
          onClick={() => navigate(pathFront.NIVEL_ESTUDIO_ADMIN)}
        />
      </Stack>
      <ModalGrados 
        open={open}
        setOpen={setOpen}
        saveGrado={saveGrado}
        isDataToEdit={isDataToEdit}
        setIsDataToEdit={setIsDataToEdit}
      />
    </Box>
  );
}

const ModalGrados = ({ open, setOpen, saveGrado, isDataToEdit, setIsDataToEdit }) => {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("GRADO" in fieldValues) {
      temp.GRADO = !fieldValues.GRADO ? "El campo Grado es requerido" : "";
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
      saveGrado(data)
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
    title="Nuevo Grado"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controls.InputComponent
            label="Grado"
            name="GRADO"
            onChange={handleInputFormChange}
            error={errors.GRADO}
            value={data.GRADO}
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