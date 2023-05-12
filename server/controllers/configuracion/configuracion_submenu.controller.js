/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message")
const ConfiguracionSubmenu = require("../../models/configuracion/configuracion_submenu.model")
const UtilComponents = require("../../utils/UtilsComponents")

const index = async (req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_SUBMENU, PATH, PATH_FILE, ESTADO, PATH_BASE } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_SUBMENU, PATH, PATH_FILE, PATH_BASE, ESTADO: ESTADO ? true : false })

    const data = await ConfiguracionSubmenu.paginate(dataFilter, { limit: rowsPerPage, page })
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
    const { NOMBRE_SUBMENU, NOMBRE_ICON, PATH, PATH_FILE, PATH_BASE, ESTADO, _id, ORDEN } = req.body
    const validData = UtilComponents.ValidarParametrosObligatorios({NOMBRE_SUBMENU, NOMBRE_ICON, PATH, PATH_FILE, PATH_BASE, ESTADO})
    if (validData) throw(validData);
    if (_id) { // EDITAR
      await ConfiguracionSubmenu.findByIdAndUpdate({ _id }, { NOMBRE_SUBMENU, NOMBRE_ICON, PATH, PATH_FILE, PATH_BASE, ESTADO, ORDEN });
      res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })
    } else { // GUARDAR
      const saveData = new ConfiguracionSubmenu({ NOMBRE_SUBMENU, NOMBRE_ICON, PATH, PATH_FILE, PATH_BASE, ESTADO, ORDEN });
      await saveData.save()
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

const del = async (req, res) => {
  try {
    const { id } = req.params;
    const validData = UtilComponents.ValidarParametrosObligatorios({_id: id})
    if (validData) throw(validData)
    const searchSubpagina = await ConfiguracionSubmenu.findById({_id: id})
    
    if (!searchSubpagina) throw({
      error: true,
      status: 201,
      statusText: MessageConstants.MESSAGE_DELETE_NOT_FOUND
    })

    await ConfiguracionSubmenu.findByIdAndDelete({_id: id});
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.MESSAGE_SUCCESS_DELETE
    })
  } catch (err) {
    return res.status(err.status || 201).json({ ...err })
  }
}

const searchByIds = async (req, res) => {
  try {
    const { arrIds } = req.body;
    if (arrIds instanceof Array === false) throw({
      error: true,
      status: 401,
      statusText: "El parámetro proveído no es un arreglo"
    })

    arrIds.forEach(id => {
      let idValido = UtilComponents.ValidarObjectIdValido(id)
      if (idValido instanceof Object === true) {
        throw({ ...idValido })
      }
    })

    const dataSearch = await ConfiguracionSubmenu.find({ _id: {$in: arrIds}})
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: dataSearch
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const update = async (req, res) => {
  try {
    const { NOMBRE_SUBMENU, NOMBRE_ICON, PATH, PATH_BASE, PATH_FILE, _id } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({NOMBRE_SUBMENU, NOMBRE_ICON, PATH, PATH_FILE, PATH_BASE})
    if (validData) throw(validData)

    if (_id) { // UPDATE 
      await ConfiguracionSubmenu({ _id }, {NOMBRE_SUBMENU, NOMBRE_ICON, PATH} )
      res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })
    }

    if (!_id) { // SAVE
      const saveData = new ConfiguracionSubmenu({ NOMBRE_SUBMENU, NOMBRE_ICON, PATH, PATH_FILE, PATH_BASE });
      await saveData.save()
      res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
    
  } catch (err) {
    return res.status(err.status ).json({ ...err })
  }
}

module.exports = {
  index,
  store, 
  del,
  update,
  searchByIds
}