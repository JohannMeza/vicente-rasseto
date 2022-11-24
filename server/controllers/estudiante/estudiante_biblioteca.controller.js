const MessageConstants = require("../../constants/message");
const AdministracionMultimedia = require("../../models/administracion/administracion_multimedia.model");
const UtilComponents = require("../../utils/UtilsComponents");

const index = async (req, res) => {
  try {
    const dataLibro = await AdministracionMultimedia.find({TIPO: "Libro"})
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