/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const NivelEstudio = require("../../models/administracion/administracion_nivel_estudio.model");
const UtilComponents = require("../../utils/UtilsComponents");

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @return Lista todos los niveles de estudio
 */

const index = async (req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const { NIVEL_ESTUDIO, ESTADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NIVEL_ESTUDIO, ESTADO })
    const nivelEstudio = await NivelEstudio.paginate(dataFilter, { limit: rowsPerPage, page });
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: nivelEstudio.docs,
      rowsPerPage: nivelEstudio.limit,
      page: nivelEstudio.page,
      count: nivelEstudio.totalDocs
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err });
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @return Guarda un nuevo Nivel de Estudio
 */

const store = async (req, res) => {
  try {
    const { NIVEL_ESTUDIO, ESTADO, _id } = req.body;
    const validarDatos = UtilComponents.ValidarParametrosObligatorios({ NIVEL_ESTUDIO, ESTADO })
    if (validarDatos) throw({ ...validarDatos })

    if (_id) { // UPDATE
      await NivelEstudio.findByIdAndUpdate({ _id }, { NIVEL_ESTUDIO, ESTADO })
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })
    } else { // SAVE
      const NivelEstudioSave = new NivelEstudio({ NIVEL_ESTUDIO, ESTADO });
      await NivelEstudioSave.save();
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
  } catch (err) {
    return res.status(err.status || 500).json({...err});
  }
}

module.exports = {
  index,
  store
}