/* eslint-disable no-throw-literal */
const SeguridadPerfiles = require("../../models/seguridad/seguridad_perfiles.model");

const index = async (req, res) => {
  try {
    const perfilesList = await SeguridadPerfiles.find();
    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Request successfully",
      data: perfilesList
    })
  } catch (err) {
    return res.status(500).json({...err})
  }
}

const store = async (req, res) => {
  try {
    const { NOMBRE_PERFIL } = req.body;
    if (!NOMBRE_PERFIL) throw({
      error: true,
      status: 401,
      statusText: "El campo NOMBRE DE PERFIL es obligatorio"
    })
    
    const savePerfil = new SeguridadPerfiles({ ...req.body });
    await savePerfil.save();
    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Se registró el perfil con éxito"
    })

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