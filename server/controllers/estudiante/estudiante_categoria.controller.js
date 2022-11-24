const MessageConstants = require("../../constants/message");
const AdministracionCategorias = require("../../models/administracion/administracion_categorias.model")
const UtilComponents = require("../../utils/UtilsComponents");

const search = async (req, res) => {
  try {
    const { CATEGORIA } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ CATEGORIA })
    const data = await AdministracionCategorias.find({ dataFilter }, { _id: 1, CATEGORIA: 1 })

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
  search
}