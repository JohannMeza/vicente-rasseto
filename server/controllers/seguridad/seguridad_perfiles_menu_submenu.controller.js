/* eslint-disable no-throw-literal */
const SeguridadPerfilesMenuSubmenu = require("../../models/seguridad/seguridad_perfiles_menu_submenu.model");

/**
 * 
 * @param {Object} request
 * @param {Object} response
 * @returns Lista todas las subpaginas de Perfil con su respectivo Menu y Submenu
 */

const index = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) throw({
      error: true,
      status: 404,
      statusText: "Parametro Requerido no encontrado"
    })

    const menusAndSubmenus = await SeguridadPerfilesMenuSubmenu.findOne({ ID_SEGURIDAD_PERFILES: id }).populate("ID_CONFIGURACION_MENU").populate("ID_CONFIGURACION_SUBMENU")

    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Request Successfully",
      data: menusAndSubmenus
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {Object} request
 * @param {Object} response
 * @returns Guarda Sub Paginas por Perfil de Usuario
 */

const store = (req, res) => {
  try {
    const { PAGINAS_PERFIL, ID_PERFIL } = req.body;
    
    if (PAGINAS_PERFIL instanceof Array === false) throw({
      error: true,
      status: 401,
      statusText: "Parametro PAGINAS_PERFIL no es un arreglo"
    })

    if (PAGINAS_PERFIL.length === 0) throw({
      error: true,
      status: 401,
      statusText: "Parametro PAGINAS_PERFIL esta vacio"
    })

    if (!ID_PERFIL) throw({
      error: true,
      status: 401,
      statusText: "Parametro ID_PERFIL es requerido"
    })

    Promise.all([
      SeguridadPerfilesMenuSubmenu.deleteMany({ ID_SEGURIDAD_PERFILES: ID_PERFIL })
    ])
    .then(async () => {
      await SeguridadPerfilesMenuSubmenu.insertMany(PAGINAS_PERFIL)
      res.status(201).json({
        error: false,
        status: 201,
        statusText: "Request Succesfully"
      })
    })

  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {Object} request
 * @param {Object} response
 * @returns Filtra las sub paginas por perfil de usuario
 */

const show = async (req, res) => {
  try {
    const { id } = req.params
    const menusAndSubmenus = await SeguridadPerfilesMenuSubmenu.find({ ID_SEGURIDAD_PERFILES: id }).populate("ID_CONFIGURACION_MENU").populate("ID_CONFIGURACION_SUBMENU")
    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Request Successfully",
      data: menusAndSubmenus
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

module.exports = {
  index,
  store,
  show
}