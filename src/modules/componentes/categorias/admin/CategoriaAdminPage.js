import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ButtonsSearchComponent from '../../../../components/utilComponents/ButtonsSearchComponent';
import { pathServer } from '../../../../config/router/path';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
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
  CATEGORIA: "",
  ESTADO: true
}


export default function GradosAdminPage () {
  const [open, setOpen] = useState(false);
  const [data, handleInputChange, resetData, setData] = useForm(dataInitialFilter)
  const [pagination, setPagination] = useState(paginate);
  const [categoria, setCategoria] = useState([]);
  const [isDataToEdit, setIsDataToEdit] = useState(null)
  const setLoader = useLoaderContext();
  
  const getCategoria = (rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.CATEGORIA.INDEX,
      body: data,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        setLoader(false)
        setCategoria(resp.data);
      },
      error: (err) => {
        setLoader(false)
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
      }
    })
  }

  const saveData = (dataEdit) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.CATEGORIA.NEW,
      body: dataEdit,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        getCategoria()
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
    setOpen(true)
    setIsDataToEdit({ ...dataEdit })
  }

  useEffect(() => {
    getCategoria()
  }, [])

  return(
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Categorias" />

        <Controls.ButtonComponent
          variant="primary-small"
          type="admin"
          title="Nueva Categoria"
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
              label="Categoria"
              name="CATEGORIA"
              value={data.CATEGORIA}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Estado" 
              list={estadoList}
              name="ESTADO"
              value={data.ESTADO}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent
          resetForm={() => resetData()}
          filterForm={() => getCategoria()}
        />
      </Box>
      <br />
      <Controls.TableComponents>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Operación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              categoria.length > 0 ?
              categoria.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.CATEGORIA}</TableCell>
                  <TableCell>{el.ESTADO ? 'Activo' : 'Inactivo'}</TableCell>
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
              <TableRow colSpan={2}>
                <TableCell>Sin resultados de búsqueda</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Controls.TableComponents>

      <ModalCategoria 
        open={open}
        setOpen={setOpen}
        isDataToEdit={isDataToEdit}
        setIsDataToEdit={setIsDataToEdit}
        saveData={saveData}
      />
    </Box>
  )
}

const dataInitial = {
  CATEGORIA: "",
  ESTADO: true
}

const ModalCategoria = ({ open, setOpen, isDataToEdit, setIsDataToEdit, saveData }) => {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("CATEGORIA" in fieldValues) {
      temp.CATEGORIA = !fieldValues.CATEGORIA ? "El campo Categoria es requerido" : "";
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
    title="Nueva Categoría"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controls.InputComponent
            label="Categoria"
            name="CATEGORIA"
            onChange={handleInputFormChange}
            error={errors.CATEGORIA}
            value={data.CATEGORIA}
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
          onClick={handleClickSave}
        />
      </Stack>
    </Controls.Modal>
  )
}