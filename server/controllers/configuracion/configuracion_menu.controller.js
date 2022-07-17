/* eslint-disable no-throw-literal */
const ConfiguracionMenu = require("../../models/configuracion/configuracion_menu.model");
const ConfiguracionSubmenu = require("../../models/configuracion/configuracion_submenu.model")

const index = async (req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const data = await ConfiguracionMenu.paginate({}, {limit: rowsPerPage, page});
    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Request Successfully",
      data: data.docs,
      rowsPerPage: data.limit,
      page: data.page,
      count: data.totalDocs
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const store = async (req, res) => {
  try {
    const { NOMBRE_MENU, NOMBRE_ICON, _id, SUBMENUS } = req.body;

    if (!NOMBRE_MENU) throw({
      error: true,
      status: 401,
      statusText: "El campo NOMBRE DEL MENU es obligatorio"
    })

    if (!NOMBRE_ICON) throw({
      error: true,
      status: 401,
      statusText: "El campo NOMBRE DEL ICONO es obligatorio"
    })

    if (_id) {
      // ### ACTUALIZAR
      SUBMENUS.forEach(el => delete el._id)
      Promise.all([
        ConfiguracionMenu.findByIdAndUpdate({_id},{ NOMBRE_MENU, NOMBRE_ICON }),
        // ConfiguracionSubmenu.updateMany({}, SUBMENUS),
        ConfiguracionSubmenu.updateMany(
          { submenus: SUBMENUS },
          { $set: 
            { 
              "PATH": SUBMENUS.PATH,
              "NOMBRE_ICON": SUBMENUS.NOMBRE_ICON,
            }
          },
          { arrayFilters: [ { "element._id": { $eq: _id } } ] }
        )
      ])
      .then(async () => {
        // await ConfiguracionSubmenu.insertMany(SUBMENUS)
        res.status(201).json({
          error: false,
          status: 201,
          statusText: "La página se actualizó con éxito",
        })
      })
    } else {
      // ### GUARDAR
      const data = new ConfiguracionMenu({ NOMBRE_MENU, NOMBRE_ICON });
      await data.save() 
      const lastMenu = await ConfiguracionMenu.findOne({}, {_id: 1}).sort({ $natural: -1 }).limit(1)

      SUBMENUS.forEach(el => {
        el.ID_MENU = lastMenu._id
        delete el._id
      })

      await ConfiguracionSubmenu.insertMany(SUBMENUS)

      res.status(201).json({
        error: false,
        status: 201,
        statusText: "La página se guardó con éxito",
      })
    }

  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const show = async (req, res) => {
  // try {
  const { id } = req.params;

  const menu = new Promise(async (resolve, reject) => {
    const res = await ConfiguracionMenu.findOne({_id: id}).exec()
    if (!res) reject({
      error: true,
      status: 401,
      statusText: "La Página no fue encontrada"
    })
    return resolve(res)
  })

  const submenu = new Promise(async (resolve, reject) => {
    const res = await ConfiguracionSubmenu.find({ID_MENU: id}).exec()
    return resolve(res)
  })

  Promise.all([
    menu,
    submenu
  ])
  .then(values => {
    let [menu, submenu] = values

    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Request Successfully",
      data: {menu, submenu}
    })
  })
  .catch(err => {
    return res.status(err.status || 500).json({...err})
  })
}

const update = (req, res) => {
  res.send("update")
}

const remove = async (req, res) => {
  try {
    ConfiguracionMenu.findById(req.params.id, function(err, client) {
      if (!client) throw({
        error: true,
        status: 404,
        statusText: "Página no encontrada"
      })
      
      client.remove();
      res.status(201).json({
        error: false,
        status: 201,
        statusText: "La página se eliminó con éxito"
      })
    });    
  } catch (err) {
    return res.status(err.status || 500).json({...err})
  }
}

module.exports = {
  index, 
  store,
  show,
  update,
  remove,
}