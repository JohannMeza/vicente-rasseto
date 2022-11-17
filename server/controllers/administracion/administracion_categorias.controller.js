const MessageConstants = require("../../constants/message");
const AdministracionCategorias = require("../../models/administracion/administracion_categorias.model");
const UtilComponents = require("../../utils/UtilsComponents");

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Lista todas las categorias
 */

const index = async(req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const { CATEGORIA, ESTADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ CATEGORIA, ESTADO })
    const categorias = await AdministracionCategorias.paginate(dataFilter, { limit: rowsPerPage, page });
    return res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: categorias.docs,
      rowsPerPage: categorias.limit,
      page: categorias.page,
      count: categorias.totalDocs
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Guarda una categoria ingresada
 */

const store = async(req, res) => {
  try {
    const { CATEGORIA, ESTADO, _id } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({ CATEGORIA, ESTADO });
    if (validData) throw(validData)

    if (_id) { // UPDATE
      await AdministracionCategorias.findOneAndUpdate({_id}, { CATEGORIA, ESTADO })
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    } else { // SAVE
      const categoriaNew = new AdministracionCategorias({ CATEGORIA, ESTADO })
      await categoriaNew.save()
      return res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @returns Elimina una categoria ingresada
 */

const del = async (req, res) => {
  try {
    const ID = req.params.id;
    const validData = UtilComponents.ValidarParametrosObligatorios({ ID });
    if (validData) throw(validData)

    await AdministracionCategorias.findByIdAndDelete({ _id: ID })

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
  del
}