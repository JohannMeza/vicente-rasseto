/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const AdministracionEtiquetas = require("../../models/administracion/administracion_etiquetas.model");
const UtilComponents = require("../../utils/UtilsComponents");

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Lista todas las etiquetas
 */

 const index = async(req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const { ETIQUETA, ESTADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ ETIQUETA, ESTADO })
    const etiquetas = await AdministracionEtiquetas.paginate(dataFilter, { limit: rowsPerPage, page });
    return res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: etiquetas.docs,
      rowsPerPage: etiquetas.limit,
      page: etiquetas.page,
      count: etiquetas.totalDocs
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Guarda una nueva etiqueta
 */

 const store = async(req, res) => {
  try {
    const { ETIQUETA, ESTADO, _id } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({ ETIQUETA, ESTADO });
    if (validData) throw(validData)

    if (_id) { // UPDATE
      await AdministracionEtiquetas.findOneAndUpdate({_id}, { ETIQUETA, ESTADO })
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    } else { // SAVE
      const etiquetaNew = new AdministracionEtiquetas({ ETIQUETA, ESTADO })
      await etiquetaNew.save()
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Elimina una Etiqueta
 */

const del = async (req, res) => {
  try {
    const ID = req.params.id;
    const dataEtiqueta = await AdministracionEtiquetas.findByIdAndDelete({ _id: ID });

    if (!dataEtiqueta) throw({
      error: true,
      status: 404,
      statusText: MessageConstants.MESSAGE_DELETE_NOT_FOUND
    })

    res.status(201).json({
      error: false,
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
  del
}