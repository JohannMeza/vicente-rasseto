import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pathServer } from '../../../../config/router/path';
import { pathFront } from '../../../../config/router/pathFront';
import Controls from '../../../../framework/components/Controls';
import { ICON } from '../../../../framework/components/icons/Icon';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useBase64Encoded } from '../../../../hooks/useBase64File';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { SERVICES_GET, SERVICES_POST } from '../../../../services/services.axios';
import { MessageUtil } from '../../../../util/MessageUtil';

const estadoLibro = [
  { label: 'Publicar', value: "Publicado" },
  { label: 'No Publicar', value: "No Publicado" }
]

const dataInitial = {
  TITULO: "",
  ESTADO: "Publicar",
  CATEGORIA: "",
  ETIQUETA: "",
  AUTOR: "",
  GRADO: "",
  NIVEL_ESTUDIO: "",
  FILE: {},
  IMAGEN: {},
}

export default function LibrosDetailPage () {
  const styleImage = {
    width: "200px",
    borderRadius: "8px"
  }

  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("TITULO" in fieldValues) {
      temp.TITULO = !fieldValues.TITULO ? "El campo Titulo es requerido" : "";
    } 

    if ("ETIQUETA" in fieldValues) {
      temp.ETIQUETA = !fieldValues.ETIQUETA ? "El campo Etiqueta es requerido" : "";
    } 

    if ("ESTADO" in fieldValues) {
      temp.ESTADO = fieldValues.ESTADO === "" ? "El campo Estado es requerido" : "";
    } 

    if ("CATEGORIA" in fieldValues) {
      temp.CATEGORIA = fieldValues.CATEGORIA === "" ? "El campo Categoria es requerido" : "";
    } 

    if ("ETIQUETA" in fieldValues) {
      temp.ETIQUETA = fieldValues.ETIQUETA === "" ? "El campo Etiqueta es requerido" : "";
    } 

    if ("AUTOR" in fieldValues) {
      temp.AUTOR = fieldValues.AUTOR === "" ? "El campo Autor es requerido" : "";
    } 

    if ("GRADO" in fieldValues) {
      temp.GRADO = !fieldValues.GRADO ? "El campo Grado es requerido" : "";
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }
  
  const navigate = useNavigate();
  const { id } = useParams();
  const {data, setData, errors, setErrors, handleInputFormChange, resetForm} = useFormValidation(dataInitial, true, validate);
  const {encodedFileBase64} = useBase64Encoded();
  const setLoader = useLoaderContext();
  const [listCategorias, setListCategorias] = useState([]);
  const [listEtiquetas, setListEtiquetas] = useState([]);
  const [listAutores, setListAutores] = useState([]);
  const [listNivelEstudio, setListNivelEstudio] = useState([]);
  const [listGrados, setListGrados] = useState([]);
  const [dataImage, setDataImage] = useState({})
  const [dataPdf, setDataPdf] = useState({})
  const [libroBase64, setLibroBase64] = useState({})
  const [imagenBase64, setImagenBase64] = useState({})
  let btnFileLibro = useRef(null)
  let btnFileImage = useRef(null)
  let imgFile = useRef(null)
  let pdfFile = useRef(null)

  const getDataInitial = () => {
    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.MULTIMEDIA.DATA_INITIAL,
      body: { id_libro: id },
      fnRequest: SERVICES_POST,
      success: async (resp) => {
        let { categoria, etiqueta, autores, nivel_estudio, libro } = resp.data

        setListCategorias(categoria)
        setListEtiquetas(etiqueta)
        setListAutores(autores)
        setListNivelEstudio(nivel_estudio)

        if (libro.length > 0) {
          setData({
            ...libro[0],
            CATEGORIA: libro[0]?.ID_CATEGORIA.join(","),
            ETIQUETA: libro[0]?.ID_ETIQUETA.join(","),
            AUTOR: libro[0]?.ID_AUTOR.join(","),
          })
          
          if (libro[0]?.FILE) {
            await fetch(`data:application/pdf;base64,${libro[0]?.FILE.url}`).then(result => {  
              pdfFile.current.data = result.url
              setLibroBase64({ FILE: libro[0].FILE.url })
              setDataPdf(libro[0].FILE)
            })        
            .catch(err => {
              console.log(err)
            })
          }

          if (libro[0]?.IMAGEN) {
            imgFile.current.src = `data:image;base64,${libro[0]?.IMAGEN.url}`
            setImagenBase64({ IMAGEN: libro[0].IMAGEN.url })
            setDataImage(libro[0].IMAGEN)
          }
        }

        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const getDataGrados = (id) => {
    if (id === 0) {
      setData({ ...data, GRADO: "" })
      setListGrados([])
      return 
    };

    setLoader(true)
    SaveRequestData({
      path: pathServer.ADMINISTRACION.MULTIMEDIA.LIST_GRADOS + id,
      body: data,
      fnRequest: SERVICES_GET,
      success: (resp) => {
        setListGrados(resp.data)
        setLoader(false)
      },
      error: (err) => {
        MessageUtil({ message: err.statusText, type: "error", seg: 10 });
        setLoader(false)
      }
    })
  }

  const sizeFile = (file) => {
    let sizeMb = 1048576
    let sizeKb = 1000
    let size = 0;

    if (parseInt(file.size / sizeMb) === 0) {
      size = parseInt(Math.round(file.size / sizeKb)) + "Kb"
    } else {
      size = parseInt(Math.round(file.size / sizeMb)) + "Mb"
    }

    return size
  }

  const returnDataImage = (target,callback) => {
    let file, img;
    let _URL = window.url || window.webkitURL;

    file = target.files[0];

    if (file) {
      img = new Image();

      img.onload = function () {
        callback(this.height, this.width, sizeFile(file), file.name);
      };

      img.src = _URL.createObjectURL(file);
    } 
  }

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "NIVEL_ESTUDIO") {
      getDataGrados(value)
    }

    if (name === "FILE") {
      let _URL = window.url || window.webkitURL;
      let reader = new FileReader();
      let file = e.target.files[0]

      reader.readAsBinaryString(e.target.files[0])
      reader.onloadend = function () {
        let regExp = new RegExp("count [0-9]", "ig")
        let count = reader.result.match(regExp)[0].split(" ")[1]
        setDataPdf({ 
          pages: count,
          name: file.name,
          size: sizeFile(file)
        })
      }

      pdfFile.current.data = _URL.createObjectURL(e.target.files[0])
      encodedFileBase64(libroBase64, setLibroBase64, e)
      return
    }

    if (name === "IMAGEN") {
      let { target } = e;
      let _URL = window.url || window.webkitURL;

      returnDataImage(target , function(height,width,filesize, name){
        setDataImage({
          width: width,
          height: height,
          size: filesize,
          name: name,
        })
      });
      imgFile.current.src = _URL.createObjectURL(target.files[0])
      encodedFileBase64(imagenBase64, setImagenBase64, e)
      return
    }

    handleInputFormChange(e)
  }

  const borrarImagen = () => {
    imgFile.current.src = "";
    setDataImage({})
    setData({ ...data, IMAGEN: "" })
  }

  const borrarPdf = () => {
    pdfFile.current.data = "";
    setDataPdf({})
    setData({ ...data, FILE: "" })
  }

  const saveData = () => {
    if (validate()) {
      setLoader(true)
      SaveRequestData({
        path: pathServer.ADMINISTRACION.MULTIMEDIA.NEW,
        body: {...data, TIPO: "Libro", FILE: { url: libroBase64.FILE, ...dataPdf }, IMAGEN: { url: imagenBase64.IMAGEN, ...dataImage } },
        fnRequest: SERVICES_POST,
        success: (resp) => {
          setLoader(false)
          navigate(pathFront.LIBROS_ADMIN)
          MessageUtil({ message: resp.statusText, type: "success", seg: 10 });
        },
        error: (err) => {
          MessageUtil({ message: err.statusText, type: "error", seg: 10 });
          setLoader(false)
        }
      })
    }
  }

  useEffect(() => {
    getDataInitial()
  }, [])

  useEffect(() => {
    setData({ ...data, GRADO: "" })
  }, [data.NIVEL_ESTUDIO])

  return(
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Nuevo Libro" />
      </Stack>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", gridGap: "30px" }}>
          <Controls.Card title="Datos del Libro">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controls.InputComponent 
                  label="Titulo del Libro"
                  name="TITULO"
                  onChange={handleChangeInput}
                  value={data.TITULO}
                  error={errors.TITULO}
                />
              </Grid>
              <Grid item xs={12}>
                <Controls.SelectComponent
                  label="Estado"
                  name="ESTADO"
                  value={data.ESTADO}
                  onChange={handleChangeInput}
                  list={estadoLibro}
                  error={errors.ESTADO}
                />
              </Grid>
            </Grid>
          </Controls.Card>
          <Controls.Card title="Categoria del Libro">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controls.SearchComponent
                  label="Categoria del Libro"
                  name="CATEGORIA"
                  value={data.CATEGORIA}
                  onChange={handleChangeInput}
                  list={listCategorias}
                  error={errors.CATEGORIA}
                  multiple
                />
              </Grid>
            </Grid>
          </Controls.Card>
          <Controls.Card title="Etiqueta del Libro">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controls.SearchComponent
                  label="Etiqueta del Libro"
                  name="ETIQUETA"
                  value={data.ETIQUETA}
                  onChange={handleChangeInput}
                  list={listEtiquetas}
                  error={errors.ETIQUETA}
                  multiple
                />
              </Grid>
            </Grid>
          </Controls.Card>
          <Controls.Card title="Autor del Libro">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controls.SearchComponent
                  label="Autor/es del Libro"
                  name="AUTOR"
                  value={data.AUTOR}
                  onChange={handleChangeInput}
                  list={listAutores}
                  error={errors.AUTOR}
                  multiple
                />
              </Grid>
            </Grid>
          </Controls.Card>
          <Controls.Card title="Grado del Libro">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controls.SelectComponent
                  label="Nivel del Libro"
                  value={data.NIVEL_ESTUDIO}
                  name="NIVEL_ESTUDIO"
                  onChange={handleChangeInput}
                  list={listNivelEstudio}
                />
              </Grid>
              <Grid item xs={12}>
                <Controls.SelectComponent
                  label="Grado"
                  name="GRADO"
                  value={data.GRADO}
                  onChange={handleChangeInput}
                  list={listGrados}
                  error={errors.GRADO}
                />
              </Grid>
            </Grid>
          </Controls.Card>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", gridGap: "30px" }}>
          <Controls.Card title="Subir Libro">
            <input
              type="file"
              ref={btnFileLibro}
              style={{ visibility: "hidden", width: "0px", height: "0px", display: "none" }}
              id="inputLibroFile"
              name="FILE"
              accept=".pdf"
              onChange={handleChangeInput}
            />

            <Box style={{ display: "flex", gridGap: "10px" }}>
              <object aria-label="pdf" ref={pdfFile} style={styleImage} type="application/pdf"></object>

              <Box>
                <Typography variant="text1" component="div"><b>Informacion del Libro</b></Typography>
                <Typography variant="text2" component="div">Nombre: {dataPdf.name}</Typography>
                <Typography variant="text2" component="div">Cantidad: {dataPdf.pages || 0} páginas</Typography>
                <Typography variant="text2" component="div">Peso: {dataPdf.size}</Typography>
                {
                  libroBase64.FILE &&
                  <a href={`data:application/pdf;base64,${libroBase64.FILE}`} target="_blank" rel="noopener noreferrer">Abrir Pdf</a>
                }
              </Box>
            </Box>

            <br />

            <Stack direction="row" spacing={3} justifyContent="center">
              <Controls.ButtonComponent
                title="Borrar Libro"
                variant="secondary-small"
                type="admin"
                onClick={borrarPdf}
              />
              <Controls.ButtonComponent
                title="Cargar Libro"
                variant="primary-small"
                type="admin"
                onClick={() => btnFileLibro.current.click()}
              />
            </Stack>
          </Controls.Card>
          <Controls.Card title="Imagen">
            <input
              type="file"
              ref={btnFileImage}
              style={{ visibility: "hidden", width: "0px", height: "0px", display: "none" }}
              id="inputLibroFile"
              name="IMAGEN"
              accept="image/*"
              onChange={handleChangeInput}
            />
            
            <Box style={{ display: "flex", gridGap: "10px" }}>
              <img src="" alt="" style={styleImage} ref={imgFile} />
              <Box>
                <Typography variant="text1" component="div"><b>Informacion de la Imagen</b></Typography>
                <Typography variant="text2" component="div">Nombre: {dataImage.name}</Typography>
                <Typography variant="text2" component="div">Tamaño: {dataImage.width || 0} x {dataImage.height || 0} px</Typography>
                <Typography variant="text2" component="div">Peso: {dataImage.size}</Typography>
              </Box>
            </Box>

            <br />

            <Stack direction="row" spacing={3} justifyContent="center">
              <Controls.ButtonComponent
                title="Borrar Imagen"
                variant="secondary-small"
                type="admin"
                onClick={borrarImagen}
              />
              <Controls.ButtonComponent
                title="Cargar Imagen"
                variant="primary-small"
                type="admin"
                onClick={() => btnFileImage.current.click()}
              />
            </Stack>
          </Controls.Card>
        </Grid>
      </Grid>
      <br />
      <Stack direction="row" spacing={3} justifyContent="center">
        <Controls.ButtonComponent
          title="VOLVER"
          variant="secondary-normal"
          type="admin"
          icon={ICON.BACK}
          onClick={() => navigate(pathFront.LIBROS_ADMIN)}
        />
        <Controls.ButtonComponent
          title="Guardar"
          variant="primary-normal"
          type="admin"
          icon={ICON.SAVE}
          onClick={saveData}
        />
      </Stack>
    </Box>
  )
}

