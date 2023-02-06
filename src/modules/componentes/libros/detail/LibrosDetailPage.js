import { Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextareaAutosize, Typography } from '@mui/material';
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
import { useReadLibroBase64, useReadLibroUrl } from '../../../../hooks/useReadLibro';
import { SERVICES_GET, SERVICES_POST } from '../../../../services/services.axios';
import { MessageUtil } from '../../../../util/MessageUtil';
import { UploadFile } from '../../../../util/UploadFile';
import Libro from '../../../../assets/upload/1674847546016.pdf';
import { useForm } from '../../../../hooks/useForm';

const estadoLibro = [
  { label: 'Publicar', value: "Publicado" },
  { label: 'No Publicar', value: "No Publicado" }
]

const tipoSubida = [
  { label: 'Archivo', value: "archivo" },
  { label: 'Base64', value: "base64" },
  { label: 'Cloudinary', value: "cloudinary" },
  { label: 'Github', value: "github" }
]

const dataInitial = {
  TITULO: "",
  ESTADO: "Publicar",
  DESCRIPCION_LARGA: "",
  DESCRIPCION_CORTA: "",
  CATEGORIA: "",
  ETIQUETA: "",
  LINK: "",
  SUBIDA: "github",
  AUTOR: "",
  GRADO: "",
  NIVEL_ESTUDIO: "",
  FILE: {},
  IMAGEN: {},
  BACKGROUND: "#517ABF"
}

const dataLibroCopy = {
  FILE: "",
  PESO: "",
  PAGINAS: "",
  NOMBRE_FILE: ""
}

const descripcion_larga = 150;
const descripcion_corta = 50;

const coloresBase = [
  { color: "#517ABF", nombre: "Color Azul" },
  { color: "#F5958E", nombre: "Color Rojo" },
  { color: "#51BFA1", nombre: "Color Verde" },
]

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

    if ("SUBIDA" in fieldValues) {
      if (!fieldValues.SUBIDA) {
        temp.SUBIDA = "El campo Subida es requerido";
      } else if (fieldValues.SUBIDA !== "github") {
        temp.SUBIDA = "La opcion elegida no esta habilitada";
      } else {
        temp.SUBIDA = "";
      }
    } 

    if ("DESCRIPCION_LARGA" in fieldValues) {
      if (!fieldValues?.DESCRIPCION_LARGA || fieldValues.DESCRIPCION_LARGA === "") {
        temp.DESCRIPCION_LARGA = "El campo Descripcion Larga es requerido"
      } else if (fieldValues.DESCRIPCION_LARGA.length > descripcion_larga) {
        temp.DESCRIPCION_LARGA = `El campo Descripcion Larga no puede exceder a ${descripcion_larga} caracteres`
      } else {
        temp.DESCRIPCION_LARGA = "";
      }
    } 

    if ("DESCRIPCION_CORTA" in fieldValues) {
      if (!fieldValues?.DESCRIPCION_CORTA || fieldValues.DESCRIPCION_CORTA === "" ) {
        temp.DESCRIPCION_CORTA = "El campo Descripcion Corta es requerido"
      } else if (fieldValues.DESCRIPCION_CORTA.length > descripcion_corta) {
        temp.DESCRIPCION_CORTA = `El campo Descripcion Corta no puede exceder a ${descripcion_corta} caracteres`
      } else {
        temp.DESCRIPCION_CORTA = "";
      }
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }
  
  const navigate = useNavigate();
  const {id} = useParams();
  const {data, setData, errors, setErrors, handleInputFormChange} = useFormValidation(dataInitial, true, validate);
  const setLoader = useLoaderContext();
  const [listCategorias, setListCategorias] = useState([]);
  const [listEtiquetas, setListEtiquetas] = useState([]);
  const [listAutores, setListAutores] = useState([]);
  const [listNivelEstudio, setListNivelEstudio] = useState([]);
  const [listGrados, setListGrados] = useState([]);
  const {encodedFileBase64} = useBase64Encoded();
  
  // DATA DE LA IMAGEN
  const [imagenBase64, setImagenBase64] = useState({})
  const [dataImage, setDataImage] = useState({})
  
  // DATA DEL PDF
  const [pdfBase64, setPdfBase64] = useState()
  const [pdfPath, setPdfPath] = useState();
  const [descripcionPdf, setDescripcionPdf] = useState({})
  const [libroBase64, setLibroBase64] = useState({ FILE: "" })
  const [updateData, setUpdateData] = useState(false);

  const [filename, setFilename] = useState({})
  let [canvas, numeroPaginas] = useReadLibroUrl(pdfPath, 1)
  let [canvas64] = useReadLibroBase64(pdfBase64, 1)
  let [stateCanvasInitial, setStateCanvasInitial] = useState(true)
  let [copyLibros, handleInputChange, , setCopyLibros] = useForm(dataLibroCopy)

  // const [stateInitial, setStateInitial] = useState(true)

  let btnFileLibro = useRef(null)
  let btnFileImage = useRef(null)
  let imgFile = useRef(null)

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
        if (Object.entries(libro || {}).length > 0) {
          setData({
            ...libro,
            CATEGORIA: libro?.ID_CATEGORIA.join(","),
            ETIQUETA: libro?.ID_ETIQUETA.join(","),
            AUTOR: libro?.ID_AUTOR.join(","),
            GRADO: libro?.ID_GRADO._id,
            NIVEL_ESTUDIO: libro?.ID_GRADO.ID_NIVEL_ESTUDIO._id,
            SUBIDA: "github"
          })
          setCopyLibros({
            FILE: libro.FILE,
            PESO: libro.PESO,
            PAGINAS: libro.PAGINAS,
            NOMBRE_FILE: libro.NOMBRE_FILE
          })
          if (libro?.FILE) {
            setPdfPath(libro.FILE)
          }

          if (libro?.IMAGEN) {
            if (libro?.IMAGEN.url) imgFile.current.src = `data:image;base64,${libro?.IMAGEN.url}`
            setImagenBase64({ IMAGEN: libro.IMAGEN.url })
            setDataImage(libro.IMAGEN)
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
      let reader = new FileReader();
      let file = e.target.files[0]

      if (e.target.files.length === 0) return;
      
      reader.readAsBinaryString(e.target.files[0])
      reader.onloadend = function () {
        let regExp = new RegExp("count [0-9]", "ig")
        let count = reader.result.match(regExp)?.length > 0 ? reader.result.match(regExp)[0].split(" ")[1] : 0
        setDescripcionPdf({ 
          PAGINAS: numeroPaginas === 0 || count,
          NOMBRE_FILE: file.name,
          PESO: sizeFile(file)
        })
      }

      // pdfFile.current.data = _URL.createObjectURL(e.target.files[0])
      setFilename(file)
      setStateCanvasInitial(false)
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
    setDescripcionPdf({})
    setLibroBase64({})
    setData({ ...data, FILE: "" })
    setFilename({})
    setStateCanvasInitial(false)
    setPdfBase64(null)
  }

  const saveData = () => {
    if (validate()) {
      let obj = { ...data, ...descripcionPdf, TIPO: "Libro", FILE_PATH: filename, IMAGEN: imagenBase64.IMAGEN, DATA_IMAGEN: JSON.stringify(dataImage) }
      const formData = UploadFile(obj);
      setLoader(true)
      SaveRequestData({
        path: pathServer.ADMINISTRACION.MULTIMEDIA.NEW + data.SUBIDA,
        body: formData,
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

  const updateDatosLibro = () => {
    setUpdateData(true)
    setPdfPath("")
    setCopyLibros({
      FILE: data.FILE,
      NOMBRE_FILE: data.NOMBRE_FILE,
      PESO: data.PESO,
      PAGINAS: data.PAGINAS
    })
  }

  const handleCancelUpdateDataLibro = () => {
    setUpdateData(false)
    setPdfPath(data.FILE)
    setCopyLibros({
      FILE: data.FILE,
      NOMBRE_FILE: data.NOMBRE_FILE,
      PESO: data.PESO,
      PAGINAS: data.PAGINAS
    })
  }

  const handleUpdateDataLibro = () => {
    setData((data) => { return { ...data, ...copyLibros, TITULO: copyLibros.NOMBRE_FILE }})
    setDescripcionPdf({ PAGINAS: copyLibros.PAGINAS || 0, NOMBRE_FILE: copyLibros.NOMBRE_FILE, PESO: copyLibros.PESO, FILE: copyLibros.FILE })
    setPdfPath(copyLibros.FILE)
    setUpdateData(false)
  }

  useEffect(() => {
    getDataInitial()
  }, [])

  useEffect(() => {
    if (libroBase64?.FILE) {
      setPdfBase64(atob(libroBase64?.FILE))
    }
  }, [libroBase64])

  useEffect(() => {
    if (data._id) {
      setData({ ...data, GRADO: "" })
      getDataGrados(data.NIVEL_ESTUDIO)
    }
  }, [data.NIVEL_ESTUDIO])

  return(
    <Box>
      <Stack direction="row" spacing={3}>
        <Controls.Title variant="h1" component="h1" title="Nuevo Libro" />
      </Stack>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} sx={{ display: "flex", flexDirection: "column", gridGap: "30px" }}>
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
                <Controls.InputComponent 
                  label="Link del Libro"
                  name="LINK"
                  onChange={handleChangeInput}
                  value={data.LINK}
                  error={errors.LINK}
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
              <Grid item xs={12}>
                <Controls.SelectComponent
                  label="Tipo Subida"
                  name="SUBIDA"
                  value={data.SUBIDA}
                  onChange={handleChangeInput}
                  list={tipoSubida}
                  error={errors.SUBIDA}
                />
              </Grid>
              <Grid item xs={12}>
                <Controls.InputComponent 
                  label={!data.DESCRIPCION_LARGA?.length ? `Descripción larga del libro` : `Descripción larga del libro (${data.DESCRIPCION_LARGA?.length} de ${descripcion_larga})` }
                  name="DESCRIPCION_LARGA"
                  multiline
                  onChange={handleChangeInput}
                  value={data.DESCRIPCION_LARGA}
                  error={errors.DESCRIPCION_LARGA}
                />
              </Grid>
              <Grid item xs={12}>
                <Controls.InputComponent 
                  label={!data.DESCRIPCION_CORTA?.length ? `Descripción corta del libro` : `Descripción corta del libro (${data.DESCRIPCION_CORTA?.length} de ${descripcion_corta})` }
                  name="DESCRIPCION_CORTA"
                  multiline
                  onChange={handleChangeInput}
                  value={data.DESCRIPCION_CORTA}
                  error={errors.DESCRIPCION_CORTA}
                />
              </Grid>
            </Grid>
          </Controls.Card>
          <Controls.Card title="Estilo del Libro">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className="display-flex" sx={{ gap: "15px", justifyContent: "space-between", flexWrap: "wrap" }}>
                  {coloresBase.map((el, index) => 
                    <Button 
                      type="green" 
                      key={index} 
                      variant={el.color === data.BACKGROUND ? "contained" : "outlined"} 
                      size="large"
                      sx={{ flexGrow: 1 }}
                      onClick={() => {
                        setData({...data, BACKGROUND: el.color})
                      }}
                    >
                      <Box className="display-flex display-flex-center-center" sx={{ flexDirection: "column", p: 2 }}>
                        <Controls.TextComponent variant="span3" component="p" children={el.nombre} />
                        <Box sx={{ background: el.color, width: "50px", height: "50px" }}></Box>
                      </Box>  
                    </Button>
                  )}
                </Box>
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
                  label="Nivel del Estudio"
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
        <Grid item xs={12} sm={12} md={6} sx={{ display: "flex", flexDirection: "column", gridGap: "30px" }}>
          <Controls.Card title="Subir Libro">
            {
              (
                updateData
              ) ? (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Controls.InputComponent 
                        label="Ruta del libro"
                        name="FILE"
                        multiline
                        onChange={handleInputChange}
                        value={copyLibros.FILE}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controls.InputComponent 
                        label="Titulo"
                        name="NOMBRE_FILE"
                        onChange={handleInputChange}
                        value={copyLibros.NOMBRE_FILE}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controls.InputComponent 
                        label="Cantidad de páginas"
                        type="number"
                        min={0}
                        name="PAGINAS"
                        onChange={handleInputChange}
                        value={copyLibros.PAGINAS}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controls.InputComponent 
                        label="Peso"
                        name="PESO"
                        onChange={handleInputChange}
                        value={copyLibros.PESO}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Stack direction="row" spacing={3} justifyContent="center">
                    <Controls.ButtonComponent
                      title="Cancelar"
                      variant="secondary-small"
                      type="admin"
                      onClick={handleCancelUpdateDataLibro}
                    />
                    <Controls.ButtonComponent
                      title="Actualizar"
                      variant="primary-small"
                      type="admin"
                      onClick={handleUpdateDataLibro}
                    />
                  </Stack>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    ref={btnFileLibro}
                    style={{ visibility: "hidden", width: "0px", height: "0px", display: "none" }}
                    id="inputLibroFile"
                    name="FILE"
                    accept=".pdf"
                    onChange={handleChangeInput}
                  />

                  <Box style={{ display: "flex", gridGap: "10px", flexWrap: "wrap" }}>
                    <Box style={styleImage}>
                      { (canvas && stateCanvasInitial) && <canvas style={{ width: "100%" }} ref={canvas}></canvas> }
                      { (canvas64 && !stateCanvasInitial && pdfBase64) && <canvas style={{ width: "100%" }} ref={canvas64}></canvas> }
                      {/* <object aria-label="pdf" href={file} style={styleImage} type="application/pdf"></object> */}
                      {/* <object type="application/pdf" width="250" height="200" data={Libro}></object> */}
                    </Box>

                    <Box>
                      <Typography variant="text1" component="div"><b>Informacion del Libro</b></Typography>
                      <Typography variant="text2" component="div">Nombre: {descripcionPdf.NOMBRE_FILE || data.TITULO}</Typography>
                      <Typography variant="text2" component="div">Cantidad: {descripcionPdf.PAGINAS || data.PAGINAS || 0} páginas</Typography>
                      <Typography variant="text2" component="div">Peso: {descripcionPdf.PESO || data.PESO}</Typography>
                      <Typography variant="text3" component="div" className='color-blue_700' onClick={updateDatosLibro} sx={{ textDecoration: "underline", cursor: "pointer", userSelect: "none" }}>Actualizar datos</Typography>
                      {/* {
                        libroBase64.FILE &&
                        <a href={`data:application/pdf;base64,${libroBase64.FILE}`} target="_blank" rel="noopener noreferrer">Abrir Pdf</a>
                      } */}
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
                </>
              )
            }
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
            
            <Box style={{ display: "flex", gridGap: "10px", flexWrap: "wrap" }}>
              {imgFile && <img src="" alt="" style={styleImage} ref={imgFile} />}
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

