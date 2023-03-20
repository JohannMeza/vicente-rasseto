/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const AdministracionMultimedia = require("../../models/administracion/administracion_multimedia.model");
const CategoriasMultimedia = require("../../models/administracion/administracion_categorias.model");
const EtiquetasMultimedia = require("../../models/administracion/administracion_etiquetas.model");
const AutoresMultimedia = require("../../models/administracion/administracion_autores.model");
const UtilComponents = require("../../utils/UtilsComponents");
const SeguridadUsuarios = require("../../models/seguridad/seguridad_usuarios.model");

const index = async (req, res) => {
  try {
    const { id } = req.body;
    let camposCategorias = { CATEGORIA: "label", _id: "value" };
    let camposEtiquetas = { ETIQUETA: "label", _id: "value" };
    let camposAutores = { NOMBRE_AUTOR: "label", _id: "value" };

    const user = await SeguridadUsuarios.findById({ _id: id })
    
    if (!user.ID_GRADO) {
      throw ({
        error: true,
        status: 401,
        statusText: "El Usuario no tiene un grado asignado"
      })
    }

    const dataLibro = await AdministracionMultimedia.find({TIPO: "Libro",ESTADO: "Publicado", ID_GRADO: { $in: user.ID_GRADO }})
    const categorias = await CategoriasMultimedia.find({ESTADO: true}, { _id: 1, CATEGORIA: 1 });
    const etiquetas = await EtiquetasMultimedia.find({ESTADO: true}, { _id: 1, ETIQUETA: 1 });
    const autores = await AutoresMultimedia.find({ESTADO: true}, { _id: 1, NOMBRE_AUTOR: 1 });

    const arrCategorias = UtilComponents.CambiarNombreCampos(categorias, camposCategorias)
    const arrEtiquetas = UtilComponents.CambiarNombreCampos(etiquetas, camposEtiquetas)
    const arrAutores = UtilComponents.CambiarNombreCampos(autores, camposAutores)

    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: {
        libros: dataLibro,
        categorias: arrCategorias,
        etiquetas: arrEtiquetas,
        autores: arrAutores
      }
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const showLibro = await AdministracionMultimedia.find({ _id: id }).populate("ID_CATEGORIA").populate("ID_ETIQUETA").populate("ID_AUTOR");
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: showLibro
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const previewLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const showLibro = await AdministracionMultimedia.find({ _id: id }, { NOMBRE_FILE: 1, PAGINAS: 1, TITULO: 1, DESCRIPCION_CORTA: 1, DESCRIPCION_LARGA: 1, IMAGEN: 1, LINK: 1, BACKGROUND: 1 }).populate("ID_CATEGORIA").populate("ID_ETIQUETA").populate("ID_AUTOR");
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: showLibro
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const showLibrosRelacionados = async (req, res) => {
  try {
    const { categories, id, id_grado } = req.body;
    if (!categories || categories.length === 0) {
      throw ({
        error: false,
        status: 401,
        statusText: "Lista de categorias vacia",
        data: []
      })
    };
    const dataLibro = await AdministracionMultimedia.find({ ID_CATEGORIA: { $in: categories }, ID_GRADO: { $in: id_grado }, _id: {$ne: id} }, { NOMBRE_FILE: 1, PAGINAS: 1, TITULO: 1, DESCRIPCION_CORTA: 1, IMAGEN: 1, LINK: 1, BACKGROUND: 1 } ).limit(3);
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: dataLibro
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const search = async (req, res) => {
  try {
    const { TIPO_MULTIMEDIA, TITULO } = req.body;

    const dataFilter = UtilComponents.ValidarObjectForFilter({ TITULO })
    const data = await AdministracionMultimedia.find({ ...dataFilter, TIPO: TIPO_MULTIMEDIA, ESTADO: "Publicado" })
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: data
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

module.exports = {
  index,
  show,
  search,
  showLibrosRelacionados,
  previewLibro
}