/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const AdministracionMultimedia = require("../../models/administracion/administracion_multimedia.model");
const AdministracionCategoria = require("../../models/administracion/administracion_categorias.model");
const AdministracionEtiqueta = require("../../models/administracion/administracion_etiquetas.model");
const AdministracionAutores = require("../../models/administracion/administracion_autores.model");
const AdministracionNivelEstudio = require("../../models/administracion/administracion_nivel_estudio.model");
const AdministracionGrados = require("../../models/administracion/administracion_grados.model");
const UtilComponents = require("../../utils/UtilsComponents");

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
        ESTADO ? {ESTADO: { $regex: ESTADO, $options: 1 }} : {},
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
    console.log(err)
    return res.status(err.status || 500).json({ ...err })
  }
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
    const nivelEstudio = await AdministracionNivelEstudio.find({ESTADO: true}, {_id: 1, NIVEL_ESTUDIO: 1});
    const libro = await AdministracionMultimedia.findOne({_id: id_libro}).populate({ path: "ID_GRADO", populate: { path: "ID_NIVEL_ESTUDIO", FILE: id_libro ? 1 : -1 } }); 

    const arrCategoria = UtilComponents.CambiarNombreCampos(categorias, camposCategoria)
    const arrEtiqueta = UtilComponents.CambiarNombreCampos(etiquetas, camposEtiqueta)
    const arrAutores = UtilComponents.CambiarNombreCampos(autores, camposAutores)
    const arrNivelEstudio = UtilComponents.CambiarNombreCampos(nivelEstudio, camposNivelEstudio)

    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: { 
        multimedia, 
        categoria: arrCategoria, 
        etiqueta: arrEtiqueta, 
        autores: arrAutores,
        nivel_estudio: arrNivelEstudio,
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
 * @returns Guarda una multimedia (libro  o audio libro)
 */

const store = async (req, res) => {
  try {
    const { TITULO, ESTADO, CATEGORIA, ETIQUETA, AUTOR, GRADO, FILE, IMAGEN, _id, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PESO, PAGINAS } = req.body;
    let { BACKGROUND } = req.body;
    let arrEstadoValid = ["Publicado", "No Publicado"];
    if (!arrEstadoValid.includes(ESTADO)) {
      throw({
        error: true,
        status: 404,
        statusText: "Ocurrio un error, intente recargando la pagina o dentro de unos minutos"
      })
    }

    const validData = UtilComponents.ValidarParametrosObligatorios({ TITULO, CATEGORIA, ETIQUETA, AUTOR, GRADO, DESCRIPCION_LARGA, DESCRIPCION_CORTA })

    if (!BACKGROUND || BACKGROUND === "") {
      BACKGROUND = "#517ABF"
    }
    
    if (validData) throw(validData);
    if (_id) { // UPDATE
      await AdministracionMultimedia.findOneAndUpdate({ _id }, { TITULO, ESTADO, ID_CATEGORIA: CATEGORIA.split(","), ID_ETIQUETA: ETIQUETA.split(","), ID_AUTOR: AUTOR.split(","), ID_GRADO: GRADO, FILE, IMAGEN: IMAGEN, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PESO, PAGINAS, BACKGROUND })
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })
    } else { //  SAVE
      const multimedia = new AdministracionMultimedia({ TITULO, ESTADO, ID_CATEGORIA: CATEGORIA.split(","), ID_ETIQUETA: ETIQUETA.split(","), ID_AUTOR: AUTOR.split(","), ID_GRADO: GRADO, FILE, IMAGEN: IMAGEN, TIPO, LINK, DESCRIPCION_LARGA, DESCRIPCION_CORTA, NOMBRE_FILE, PESO, PAGINAS, BACKGROUND });
      await multimedia.save();

      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
  } catch (err) {
    console.log(err)
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

module.exports = {
  index,
  store,
  del,
  listDataInitial,
  listGrados
};