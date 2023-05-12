/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const ConfiguracionMenu = require("../../models/configuracion/configuracion_menu.model");
const ConfiguracionSubmenu = require("../../models/configuracion/configuracion_submenu.model");
const UtilComponents = require("../../utils/UtilsComponents");

const index = async (req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    let { NOMBRE_MENU, PATH, ESTADO } = req.body

    if (typeof ESTADO !== "boolean") ESTADO = true;

    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_MENU, PATH, ESTADO })
    const data = await ConfiguracionMenu.paginate(dataFilter, {limit: rowsPerPage, page, sort: { ORDEN: 1 } });
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
    const { NOMBRE_MENU, NOMBRE_ICON, _id, PATH, ESTADO, ORDEN } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({NOMBRE_MENU, NOMBRE_ICON, PATH, ESTADO})
    if (validData) throw(validData)

    if (_id) { // EDITAR
      await ConfiguracionMenu.findByIdAndUpdate({ _id }, { NOMBRE_MENU, NOMBRE_ICON, PATH, ESTADO, ORDEN })
      res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })
    } else { // GUARDAR
      const dataStore = new ConfiguracionMenu({ NOMBRE_MENU, NOMBRE_ICON, PATH, ESTADO, ORDEN })
      await dataStore.save();
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

const searchSubpaginas = async (req, res) => {
  try {
    const { id } = req.params;
    const validData = UtilComponents.ValidarParametrosObligatorios({id})
    if (validData) throw(validData)
    const subpaginas = await ConfiguracionMenu.find({ _id: id }, {ID_CONFIGURACION_SUBMENU: 1, PATH: 1 }).populate({path: 'ID_CONFIGURACION_SUBMENU', options: { sort: { ORDEN: 1 } }})

    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: subpaginas[0],
    })
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

const getSubpaginas = async (req, res) => {
  try {
    const { id } = req.params;
  } catch (err) {
    res.status(err.status || 500).json({ ...err })
  }
}

const updateSubmenus = async (req, res) => {
  try {
    const { arrSubmenus } = req.body;
    const { id } = req.params;

    const validData = UtilComponents.ValidarParametrosObligatorios({id})
    if (validData) throw(validData)

    if (arrSubmenus instanceof Array === false) throw({
      error: true,
      status: 401,
      statusText: "El parámetro proveído no es un arreglo"
    })

    arrSubmenus.forEach(id => {
      let idValido = UtilComponents.ValidarObjectIdValido(id)
      if (idValido instanceof Object === true) {
        throw({ ...idValido })
      }
    })

    await ConfiguracionMenu.findByIdAndUpdate({ _id: id }, { ID_CONFIGURACION_SUBMENU: arrSubmenus })
    res.status(201).json({
      error: true,
      statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE,
      status: 201
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
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
  searchSubpaginas,
  updateSubmenus,
  remove,
}