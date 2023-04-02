const MessageConstants = require("../../constants/message");
const AdministracionAutores = require("../../models/administracion/administracion_autores.model");
const UtilComponents = require("../../utils/UtilsComponents");
const XLSX = require('xlsx');

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Lista los Autores
 */

const index = async (req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_AUTOR, ESTADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_AUTOR, ESTADO })
    const autores = await AdministracionAutores.paginate(dataFilter, { limit: rowsPerPage, page });
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: autores.docs,
      rowsPerPage: autores.limit,
      page: autores.page,
      count: autores.totalDocs
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Guarda un nuevo autor
 */

const store = async (req, res) => {
  try {
    const { NOMBRE_AUTOR, NACIONALIDAD, DESCRIPCION_AUTOR, LINK, ESTADO, _id } = req.body;

    if (_id) { // UPDATE
      const validData = UtilComponents.ValidarParametrosObligatorios({ NOMBRE_AUTOR, LINK, ESTADO, NACIONALIDAD, DESCRIPCION_AUTOR })
      if (validData) throw(validData);
      await AdministracionAutores.findByIdAndUpdate({ _id }, { NOMBRE_AUTOR, LINK, ESTADO, NACIONALIDAD, DESCRIPCION_AUTOR})
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })
    } else {  // SAVE
      const validData = UtilComponents.ValidarParametrosObligatorios({ NOMBRE_AUTOR, LINK, ESTADO, NACIONALIDAD, DESCRIPCION_AUTOR })
      if (validData) throw(validData);
      const autorNew = new AdministracionAutores({ NOMBRE_AUTOR, LINK, ESTADO, NACIONALIDAD, DESCRIPCION_AUTOR });
      await autorNew.save();
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
    const validData = AdministracionAutores.ValidarParametrosObligatorios({ ID })
    if (validData) throw(validData);

    await AdministracionAutores.findByIdAndDelete({ _id: ID });
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
 * 
 * @param {req, res} 
 * @returns Inserta Data masiva a través de una importacion de excel
 */

const importarExcel = async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    await AdministracionAutores.insertMany(dataExcel)

    return res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.MESSAGE_IMPORT_DATA
    })
  } catch (err) {
    return res.status(err.status || 500).json({ statusText: "Error en la importacion", ...err })
  }
}

module.exports = {
  index,
  store,
  del,
  importarExcel
};