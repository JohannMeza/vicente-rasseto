/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/Message");
const AdministracionGrado = require("../../models/administracion/administracion_grados.model");
const UtilComponents = require("../../utils/UtilsComponents");

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Lista todos los grados
 */

const index = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowsPerPage, page } = req.body;
    const { GRADO, ESTADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ GRADO, ESTADO })
    const grados = await AdministracionGrado.paginate({...dataFilter, populate: 'NivelEstudio', ID_NIVEL_ESTUDIO: id }, {limit: rowsPerPage, page});
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: grados.docs,
      rowsPerPage: grados.limit,
      page: grados.page,
      count: grados.totalDocs
    })
  } catch (err) {
    console.log(err)
    return res.status(err.statusText || 500).json({...err}) 
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Guarda un nuevo grado
 */

const store = async (req, res) => {
  try {
    const { id } = req.params;
    const { GRADO, ESTADO } = req.body;
    console.log(req.body)
    const dataValid = UtilComponents.ValidarParametrosObligatorios({GRADO, ESTADO}) 
    if (dataValid) throw(dataValid)

    const administracionGrados = new AdministracionGrado({ID_NIVEL_ESTUDIO: id, GRADO, ESTADO})
    await administracionGrados.save()
    return res.status(201).json({
      error: true,
      status: 201,
      statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
    })
  } catch (err) {
    return res.status(err.status || 500).json({...err})
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Elimina un grado ya creado
 */

const del = async (req, res) => {
  try {
    const ID = req.params.id;
    const dataValid = UtilComponents.ValidarParametrosObligatorios({ ID });
    if (dataValid) throw dataValid;

    const deleteData = await AdministracionGrado.findOneAndDelete({ _id: ID });
    if (!deleteData)
      throw {
        error: true,
        status: 404,
        statusText: MessageConstants.MESSAGE_DELETE_NOT_FOUND,
      };

    return res.status(201).json({
      error: true,
      status: 201,
      statusText: "Se elimino con éxito",
    });
  } catch (err) {
    return res.status(500).json({ ...err });
  }
}

module.exports = {
  index,
  store,
  del
}