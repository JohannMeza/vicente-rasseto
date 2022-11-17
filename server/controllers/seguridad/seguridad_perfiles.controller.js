/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const SeguridadPerfiles = require("../../models/seguridad/seguridad_perfiles.model");
const UtilComponents = require("../../utils/UtilsComponents");

const index = async (req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_PERFIL, ESTADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_PERFIL, ESTADO })
    const data = await SeguridadPerfiles.paginate(dataFilter, {limit: rowsPerPage, page});

    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Request successfully",
      data: data.docs,
      rowsPerPage: data.limit,
      page: data.page,
      count: data.totalDocs
    })
  } catch (err) {
    return res.status(500).json({...err})
  }
}

const store = async (req, res) => {
  try {
    const { NOMBRE_PERFIL, IS_MANAGEABLE, ESTADO, _id } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({NOMBRE_PERFIL, IS_MANAGEABLE, ESTADO}); if (validData) throw(validData)
    
    if (_id) { // EDITAR
      const validId = UtilComponents.ValidarObjectIdValido(_id); if (validId) throw(validId)
      
      await SeguridadPerfiles.findByIdAndUpdate({ _id }, { NOMBRE_PERFIL, IS_MANAGEABLE, ESTADO })
      res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })  
    } else { // SAVE
      const dataSave = new SeguridadPerfiles({NOMBRE_PERFIL, IS_MANAGEABLE, ESTADO});
      await dataSave.save();
      res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await SeguridadPerfiles.findOne({ _id: id })
    if (!perfil) throw({
      error: true,
      status: 404,
      statusText: "El perfil no fue encontrado"
    })
    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Request Sucessfully",
      data: perfil
    })
  } catch (err) {
    return res.status(err.status || 500).json({...err})
  }
}

module.exports = {
  index,
  store,
  show
}