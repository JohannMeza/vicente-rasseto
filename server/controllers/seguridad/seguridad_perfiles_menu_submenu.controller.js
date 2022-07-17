const SeguridadPerfilesMenuSubmenu = require("../../models/seguridad/seguridad_perfiles_menu_submenu.model");

const index = (req, res) => {
  try {
    const { id } = req.params
    const menusAndSubmenus = SeguridadPerfilesMenuSubmenu.findOne({ ID_SEGURIDAD_PERFILES: id }).populate("ID_CONFIGURACION_MENU").populate("ID_CONFIGURACION_SUBMENU")
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

const store = (req, res) => {
  try {
    const { PAGINAS_PERFIL, ID_PERFIL } = req.body;

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