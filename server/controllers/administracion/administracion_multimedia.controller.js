/* eslint-disable no-throw-literal */
const AdministracionMultimedia = require("../../models/administracion/administracion_multimedia.model");
const AdministracionCategoria = require("../../models/administracion/administracion_categorias.model");
const AdministracionEtiqueta = require("../../models/administracion/administracion_etiquetas.model");
const AdministracionAutores = require("../../models/administracion/administracion_autores.model");
const AdministracionGrados = require("../../models/administracion/administracion_grados.model");
const MessageConstants = require("../../constants/message");
const UtilComponents = require("../../utils/UtilsComponents");
const cloudinary = require("cloudinary");
const EnvConstant = require("../../utils/EnvConstant");
const NivelEstudio = require("../../models/administracion/administracion_nivel_estudio.model");

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Lista todos los libros y audio libros agregados
 */

const index = async (req, res) => {
  try {
    const { page, rowsPerPage } = req.body;
    const { TITULO, ESTADO, ID_CATEGORIA, ID_ETIQUETA, ID_AUTOR, GRADO, TIPO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ TITULO, ESTADO, ID_CATEGORIA, ID_ETIQUETA, ID_AUTOR, GRADO, TIPO })
    const libros = await AdministracionMultimedia.paginate({ 
      '$and': [
        ID_AUTOR ? {ID_AUTOR: { $in: (ID_AUTOR || null) }} : {},
        ID_CATEGORIA ? {ID_CATEGORIA: { $in: (ID_CATEGORIA || null) }} : {},
        ID_ETIQUETA ? {ID_ETIQUETA: { $in: (ID_ETIQUETA || null) }} : {},
        ESTADO ? {ESTADO: { $in: ESTADO }} : {},
        {TITULO: { $regex: '.*' + TITULO + '.*', $options: 1 }},
      ]
    }, {limit: rowsPerPage, page, populate: [{path: 'ID_AUTOR'}, { path: "ID_CATEGORIA"}, { path: "ID_ETIQUETA" }]});
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: libros
    })

    // .docs,
    //   rowsPerPage: libros.limit,
    //   page: libros.page,
    //   count: libros.totalDocs
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const uploadImage = (req, res) => {
  res.send("Imagen cargada");
}

const listDataInitial = async (req, res) => {
  try {
    let camposCategoria = { CATEGORIA: "label", _id: "value" };
    let camposEtiqueta = { ETIQUETA: "label", _id: "value" };
    let camposAutores = { NOMBRE_AUTOR: "label", _id: "value" };
    let camposNivelEstudio = { NIVEL_ESTUDIO: "label", _id: "value" };
    
    const { id_libro } = req.body;  

    const multimedia = await AdministracionMultimedia.find();
    const categorias = await AdministracionCategoria.find({ESTADO: true}, {_id: 1, CATEGORIA: 1});
    const etiquetas = await AdministracionEtiqueta.find({ESTADO: true}, {_id: 1, ETIQUETA: 1});
    const autores = await AdministracionAutores.find({ESTADO: true}, {_id: 1, NOMBRE_AUTOR: 1});
    // const nivelEstudio = await AdministracionNivelEstudio.find({ESTADO: true}, {_id: 1, NIVEL_ESTUDIO: 1});
    const libro = await AdministracionMultimedia.findOne({_id: id_libro}).populate({ path: "ID_GRADO", populate: { path: "ID_NIVEL_ESTUDIO", FILE: id_libro ? 1 : -1 } }); 

    const arrCategoria = UtilComponents.CambiarNombreCampos(categorias, camposCategoria)
    const arrEtiqueta = UtilComponents.CambiarNombreCampos(etiquetas, camposEtiqueta)
    const arrAutores = UtilComponents.CambiarNombreCampos(autores, camposAutores)
    // const arrNivelEstudio = UtilComponents.CambiarNombreCampos(nivelEstudio, camposNivelEstudio)

    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: { 
        multimedia, 
        categoria: arrCategoria, 
        etiqueta: arrEtiqueta, 
        autores: arrAutores,
        // nivel_estudio: arrNivelEstudio,
        libro: libro
      }
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const listGrados = async (req, res) => {
  try {
    const { id } = req.params;
    
    let camposGrados = { GRADO: "label", _id: "value" };

    const grados = await AdministracionGrados.find({ ID_NIVEL_ESTUDIO: id }, { _id: 1, GRADO: 1 })
    const arrGrados = UtilComponents.CambiarNombreCampos(grados, camposGrados)

    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: arrGrados
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Guarda una multimedia (libro o audio libro)
 * Sube a repositorio la imagen
 */

const store_new = async (req, res) => {
  try {
    const { TITULO, ESTADO, CATEGORIA, ETIQUETA, AUTOR, _id, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PAGINAS, IMAGEN, DATA_IMAGEN, SUBIDA } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({ TITULO, CATEGORIA, ETIQUETA, AUTOR, DESCRIPCION_LARGA, DESCRIPCION_CORTA })
    let { BACKGROUND } = req.body;
    let filename, size;
    let dataImagen = { url: IMAGEN, ...JSON.parse(DATA_IMAGEN || {}) }
    
    let arrEstadoValid = ["Publicado", "No Publicado"];    
    if (!arrEstadoValid.includes(ESTADO)) throw ({ error: true, status: 404, statusText: "Ocurrio un error, intente recargando la pagina o dentro de unos minutos" })
    if (!BACKGROUND || BACKGROUND === "") BACKGROUND = "#517ABF"
    if (validData) throw (validData);

    if (_id) { // UPDATE
      const { TITULO, ESTADO, CATEGORIA, ETIQUETA, AUTOR, _id, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PAGINAS, IMAGEN, DATA_IMAGEN, SUBIDA } = req.body;
      await AdministracionMultimedia.findOneAndUpdate({ _id }, { TITULO, ESTADO, ID_CATEGORIA: CATEGORIA.split(","), ID_ETIQUETA: ETIQUETA.split(","), ID_AUTOR: AUTOR.split(","), FILE: filename, IMAGEN: dataImagen, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PESO: size, PAGINAS, BACKGROUND, SUBIDA })
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })
    } else { //  SAVE
      const multimedia = new AdministracionMultimedia({ TITULO, ESTADO, ID_CATEGORIA: CATEGORIA.split(","), ID_ETIQUETA: ETIQUETA.split(","), ID_AUTOR: AUTOR.split(","), filename, IMAGEN: dataImagen, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, size, PAGINAS, BACKGROUND, SUBIDA });
      await multimedia.save();

      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
  } catch (err) { 
    return res.status(err.status || 500).json({ ...err });
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Guarda una multimedia (libro o audio libro)
 * La multimedia ya existe en ele repositorio
 */

const store_upload = async (req, res) => {
  try {
    const { TITULO, ESTADO, CATEGORIA, ETIQUETA, AUTOR, _id, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PAGINAS, IMAGEN, DATA_IMAGEN, SUBIDA } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({ TITULO, CATEGORIA, ETIQUETA, AUTOR, DESCRIPCION_LARGA, DESCRIPCION_CORTA })
    let { BACKGROUND } = req.body;
    let filename, size;
    let dataImagen = { url: IMAGEN, ...JSON.parse(DATA_IMAGEN || {}) }
    if (SUBIDA === 'cloudinary') {
      cloudinary.config({ cloud_name: EnvConstant.APP_CLOUDINARY_NAME, api_key: EnvConstant.APP_CLOUDINARY_KEY, api_secret: EnvConstant.APP_CLOUDINARY_API_SECRET })
      const fileUpload = await cloudinary.uploader.upload(req.file.path)
      filename = fileUpload.secure_url
      size = req.file.size
    } else if (SUBIDA === 'github') {
      filename = req.body.FILE
      size = req.body.PESO
    }
    let arrEstadoValid = ["Publicado", "No Publicado"];
    
    if (!arrEstadoValid.includes(ESTADO)) throw ({ error: true, status: 404, statusText: "Ocurrio un error, intente recargando la pagina o dentro de unos minutos" })
    if (!BACKGROUND || BACKGROUND === "") BACKGROUND = "#517ABF"
    if (validData) throw (validData);

    if (_id) { // UPDATE
      const { TITULO, ESTADO, CATEGORIA, ETIQUETA, AUTOR, _id, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PAGINAS, IMAGEN, DATA_IMAGEN, SUBIDA } = req.body;
      await AdministracionMultimedia.findOneAndUpdate({ _id }, { TITULO, ESTADO, ID_CATEGORIA: CATEGORIA.split(","), ID_ETIQUETA: ETIQUETA.split(","), ID_AUTOR: AUTOR.split(","), FILE: filename, IMAGEN: dataImagen, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PESO: size, PAGINAS, BACKGROUND, SUBIDA })
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })
    } else { //  SAVE
      const multimedia = new AdministracionMultimedia({ TITULO, ESTADO, ID_CATEGORIA: CATEGORIA.split(","), ID_ETIQUETA: ETIQUETA.split(","), ID_AUTOR: AUTOR.split(","), FILE: filename, IMAGEN: dataImagen, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, size, PAGINAS, BACKGROUND, SUBIDA });
      await multimedia.save();

      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
  } catch (err) { 
    return res.status(err.status || 500).json({ ...err });
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Elimna un autor ya guardado
 */

const del = async (req, res) => {
  try {
    const ID = req.params.id;
    const validData = UtilComponents.ValidarParametrosObligatorios({ ID })
    if (validData) throw(validData);

    await AdministracionMultimedia.findByIdAndDelete({ _id: ID });
    return res.status(201).json({
      error: true,
      status: 201,
      statusText: MessageConstants.MESSAGE_SUCCESS_DELETE
    })

  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * @module Configuracion Grados 
 */

const findNivelEstudio = async (req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const { NIVEL_ESTUDIO, ESTADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NIVEL_ESTUDIO, ESTADO })
    const nivelEstudio = await NivelEstudio.aggregate([{
      $lookup: {
        from: "administraciongrados",
        localField: "_id",
        foreignField: "ID_NIVEL_ESTUDIO",
        as: "GRADOS"
      }
    }])
    
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: nivelEstudio,
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err });
  }
}

const updateGradosByLibros = async (req, res) => {
  try {
    const {id} = req.params;
    const states = req.body;
    await AdministracionMultimedia.findByIdAndUpdate({ _id: id }, { ID_GRADO: states } )

    return res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err });
  }
}

const listGradosByLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await AdministracionMultimedia.find({ _id: id }, { ID_GRADO: 1 });

    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data
    })

  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

module.exports = {
  index,
  store_new,
  store_upload,
  del,
  listDataInitial,
  listGrados,
  uploadImage,
  findNivelEstudio,
  updateGradosByLibros,
  listGradosByLibro
};