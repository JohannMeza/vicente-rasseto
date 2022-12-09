const MessageConstants = require("../../constants/message");
const AdministracionMultimedia = require("../../models/administracion/administracion_multimedia.model");
const CategoriasMultimedia = require("../../models/administracion/administracion_categorias.model");
const EtiquetasMultimedia = require("../../models/administracion/administracion_etiquetas.model");
const AutoresMultimedia = require("../../models/administracion/administracion_autores.model");
const UtilComponents = require("../../utils/UtilsComponents");

const index = async (req, res) => {
  try {
    let camposCategorias = { CATEGORIA: "label", _id: "value" };
    let camposEtiquetas = { ETIQUETA: "label", _id: "value" };
    let camposAutores = { NOMBRE_AUTOR: "label", _id: "value" };

    const dataLibro = await AdministracionMultimedia.find({TIPO: "Libro"})
    const categorias = await CategoriasMultimedia.find({}, { _id: 1, CATEGORIA: 1 });
    const etiquetas = await EtiquetasMultimedia.find({}, { _id: 1, ETIQUETA: 1 });
    const autores = await AutoresMultimedia.find({}, { _id: 1, NOMBRE_AUTOR: 1 });

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
  search
}