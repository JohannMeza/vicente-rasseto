/* eslint-disable no-throw-literal */
const ConfiguracionMenu = require("../../models/configuracion/configuracion_menu.model")
const ConfiguracionSubmenu = require("../../models/configuracion/configuracion_submenu.model")

const index = async (req, res) => {
  res.send("index")
}

const store = async (req, res) => {
  try {
    const { id } = req.params;
    const { NOMBRE_SUBMENU, PATH } = req.body
    
    if (!NOMBRE_SUBMENU) throw({
      error: true,
      status: 404,
      statusText: "El campo Nombre de la Sub Pagina es obligatorio"
    })
    
    if (!NOMBRE_SUBMENU) throw({
      error: true,
      status: 404,
      statusText: "El campo Nombre de la Sub Pagina es obligatorio"
    })

    const menu = await ConfiguracionMenu.findOne({ _id: id});
    if (!menu) throw({
      error: true,
      status: 404,
      statusText: "Pagina no encontrada"
    })



    const submenu = await ConfiguracionSubmenu({  })

  } catch (err) {
    
  }
}