import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ButtonsSearchComponent from '../../../../components/utilComponents/ButtonsSearchComponent';
import { pathServer } from '../../../../config/router/path';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { SERVICES_POST } from '../../../../services/services.axios';
import { AlertUtilRelease } from '../../../../util/AlertUtil';
import { MessageUtil } from '../../../../util/MessageUtil';
import { UploadFile } from '../../../../util/UploadFile';

const dataInitialFilter = {  
  NOMBRE_AUTOR: "",
  NACIONALIDAD: "",
  DESCRIPCION_AUTOR: "",
  LINK: "",
  ESTADO: true
}

const estadoList = [
  { label: "Activo", value: true },
  { label: "Inactivo", value: false }
]

const paginate = {
  rowsPerPage: 10,
  page: 0,
  count: 0,
};

export default function LibrosAdminPage () {
  const [open, setOpen] = useState(false);
  const [data, handleInputChange, resetData] = useForm(dataInitialFilter)
  const setLoader = useLoaderContext();
  const [pagination, setPagination] = useState(paginate);
  const [autores, setAutores] = useState([])
  const [isDataToEdit, setIsDataToEdit] = useState(null)
  const inputFile = useRef();

  const getAutores = (rowsPerPage = 10, page = 1) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.AUTOR.INDEX,
      body: data,
      fnRequest: SERVICES_POST,
      pagination: true,
      rowsPerPage,
      page,
      success: (resp) => {
        setLoader(false)
        setAutores(resp.data);
        let { rowsPerPage, count, page } = resp;
        --page;
        setPagination({ rowsPerPage, count, page });
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const handleClickEdit = (isData) => {
    setIsDataToEdit(isData)
    setOpen(true)
  }

  const saveAutor = (data) => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.AUTOR.NEW,
      body: data,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        getAutores()
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
        setOpen(false)
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const importarExcel = (e) => {
    setLoader(true)
    
    let obj = { FILE_PATH: e.target.files[0]}
    const formData = UploadFile(obj);
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.AUTOR.IMPORTAR,
      body: formData,
      fnRequest: SERVICES_POST,
      success: (resp) => {
        e.target.value = null
        setLoader(false)
        getAutores()
        MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
      },
      error: (err) => {
        e.target.value = null
        setLoader(false)
        AlertUtilRelease({ title: "Error", text: err.statusText, icon: "error" })
      }
    })
  }

  useEffect(() => {
    getAutores()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Autores" />

        <Grid item xs={12} sm={12} md={10} lg={6} xl={5}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6}>
              <Controls.ButtonComponent
                variant="primary-small"
                type="admin"
                title="Nuevo"
                onClick={() => setOpen(true)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <input type="file" ref={inputFile} onChange={importarExcel} style={{ display: "none" }} accept=".xlsx" />
              <Controls.ButtonComponent
                variant="secondary-small"
                type="admin"
                title="Importar"
                style={{ width: "100%" }}
                onClick={() => inputFile.current.click()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Stack>
      <br />
      <Box>
        <Controls.TextComponent variant="h3" component="div">Filtros de Búsqueda</Controls.TextComponent>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.InputComponent 
              label="Nombre" 
              name="NOMBRE_AUTOR"
              onChange={handleInputChange}
              value={data.NOMBRE_AUTOR}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Controls.SelectComponent 
              label="Estado"
              list={estadoList}
              name="ESTADO"
              onChange={handleInputChange}
              value={data.ESTADO}
            />
          </Grid>
        </Grid>
        <br />
        <ButtonsSearchComponent
          resetForm={() => resetData()}
          filterForm={() => getAutores()}
        />
      </Box>
      <br />
      <Controls.TableComponents
        pagination={pagination}
        setPagination={setPagination}
        fnPagination={getAutores}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              autores?.length > 0 ? 
              autores.map((el, index) => (
                <TableRow key={index}>
                  <TableCell>{el.NOMBRE_AUTOR}</TableCell>
                  <TableCell>{el.ESTADO ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Controls.ButtonIconComponent
                        title="Editar"
                        icon={ICON.EDIT}
                        onClick={() => handleClickEdit(el)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
              : 
              <TableRow>
                <TableCell colSpan={2}>Sin resultados de búsqueda</TableCell>
              </TableRow>
            }
        
          </TableBody>
        </Table>
      </Controls.TableComponents>

      <ModalAutor 
        open={open}
        setOpen={setOpen}
        isDataToEdit={isDataToEdit}
        setIsDataToEdit={setIsDataToEdit}
        saveAutor={saveAutor}
      />
    </Box>
  )
}

const dataInitial = {  
  NOMBRE_AUTOR: "",
  LINK: "",
  NACIONALIDAD: "",
  DESCRIPCION_AUTOR: "",
  ESTADO: true
}

const ModalAutor = ({ open, setOpen, isDataToEdit, setIsDataToEdit, saveAutor }) => {
  const [title, setTitle] = useState(null);
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("NOMBRE_AUTOR" in fieldValues) {
      temp.NOMBRE_AUTOR = !fieldValues.NOMBRE_AUTOR ? "El campo Nombre de Autor es requerido" : "";
    } 

    if ("LINK" in fieldValues) {
      temp.LINK = !fieldValues.LINK ? "El campo Página Web es requerido" : "";
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
      saveAutor(data)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (isDataToEdit) setData(isDataToEdit) }, [isDataToEdit])
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (open) setTitle(isDataToEdit ? 'Editar Autor' : 'Nuevo Autor')}, [open])

  return (
    <Controls.Modal
    open={open}
    setOpen={closeModal}
    title={title}
    fullWidth
    maxWidth="sm"
  >
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Controls.InputComponent 
          label="Nombre de Autor"
          onChange={handleInputFormChange}
          name="NOMBRE_AUTOR"
          value={data.NOMBRE_AUTOR}
          error={errors.NOMBRE_AUTOR}
        />
      </Grid>

      <Grid item xs={12}>
        <Controls.InputComponent 
          label="Pagina Web"
          onChange={handleInputFormChange}
          name="LINK"
          value={data.LINK}
          error={errors.LINK}
        />
      </Grid>

      <Grid item xs={12}>
        <Controls.InputComponent 
          label="Nacionalidad"
          onChange={handleInputFormChange}
          name="NACIONALIDAD"
          value={data.NACIONALIDAD}
          error={errors.NACIONALIDAD}
        />
      </Grid>
      
      <Grid item xs={12}>
          <Controls.InputComponent
          label="Descripcion del Autor"
          onChange={handleInputFormChange}
          name="DESCRIPCION_AUTOR"
          value={data.DESCRIPCION_AUTOR}
          error={errors.DESCRIPCION_AUTOR}
          multiline
        />
      </Grid>

      <Grid item xs={12}>
        <Controls.SelectComponent 
          label="Estado"
          list={estadoList}
          name="ESTADO"
          onChange={handleInputFormChange}
          value={data.ESTADO}
          error={errors.ESTADO}
        />
      </Grid>
      
      <Grid item xs={12}>
        <Stack direction="row" spacing={3} justifyContent="center">
          <Controls.ButtonComponent
            title="Volver"
            variant="secondary-normal"
            type="admin"
            icon={ICON.BACK}
            onClick={closeModal}
          />

          <Controls.ButtonComponent
            title={"Guardar"}
            variant="primary-normal"
            type="admin"
            icon={ICON.SAVE}
            onClick={handleClickSave}
            />
        </Stack>
      </Grid>
    </Grid>
  </Controls.Modal>
  )
}