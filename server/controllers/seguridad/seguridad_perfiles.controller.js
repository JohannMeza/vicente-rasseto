/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const SeguridadPerfiles = require("../../models/seguridad/seguridad_perfiles.model");
const UtilComponents = require("../../utils/UtilsComponents");

const index = async (req, res) => {
  try {
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_PERFIL, ESTADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_PERFIL, ESTADO })
    const data = await SeguridadPerfiles.paginate(dataFilter, {limit: rowsPerPage, page});

    res.status(201).json({
      error: false,
      status: 201,
      statusText: "Request successfully",
      data: data.docs,
      rowsPerPage: data.limit,
      page: data.page,
      count: data.totalDocs
    })
  } catch (err) {
    return res.status(500).json({...err})
  }
}

const store = async (req, res) => {
  try {
    const { NOMBRE_PERFIL, IS_MANAGEABLE, ESTADO, _id, USER } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({NOMBRE_PERFIL, IS_MANAGEABLE, ESTADO}); if (validData) throw(validData)
    const validarPerfil = await SeguridadPerfiles.findOne({ _id })
    let perfil = validarPerfil?.NOMBRE_PERFIL || "";
    let isReservado = null;

    if (perfil !== "") {

      if (perfil.toLowerCase() === "administrador" || perfil.toLowerCase() === "docente" || perfil.toLowerCase() === "estudiante") {
        const validarPerfilDefecto = await SeguridadPerfiles.find({ NOMBRE_PERFIL: { $in: [ /administrador/i, /docente/i, /estudiante/i ] }}, { NOMBRE_PERFIL: 1 });
  
        validarPerfilDefecto.forEach(el => {
          let perfilData = el.NOMBRE_PERFIL;
          if (perfilData.toLowerCase() === perfil.toLowerCase()) {
            isReservado = true;
          }
        })
      }
    } else {
      if (NOMBRE_PERFIL.toLowerCase() === "administrador" || NOMBRE_PERFIL.toLowerCase() === "docente" || NOMBRE_PERFIL.toLowerCase() === "estudiante") {
        const validarPerfilDefecto = await SeguridadPerfiles.find({ NOMBRE_PERFIL: { $in: [ /administrador/i, /docente/i, /estudiante/i ] }}, { NOMBRE_PERFIL: 1 });
  
        validarPerfilDefecto.forEach(el => {
          let perfilData = el.NOMBRE_PERFIL;
          if (perfilData.toLowerCase() === NOMBRE_PERFIL.toLowerCase()) {
            isReservado = true;
          }
        })
      }
    }

    if (_id) { // EDITAR
      if (IS_MANAGEABLE && USER.toLowerCase() !== "administrador") {
        throw({
          error: true,
          status: 401,
          statusText: "Este perfil no es administrable"
        })
      }

      if (isReservado) {
        if ((NOMBRE_PERFIL.toLowerCase() === "administrador" || NOMBRE_PERFIL.toLowerCase() === "docente" || NOMBRE_PERFIL.toLowerCase() === "estudiante") && (perfil !== NOMBRE_PERFIL)) {
          throw({
            error: true,
            status: 401,
            statusText: "Este nombre de perfiles es reservados por el sistema, intenta crear con otro nombre"
          })
        }

        await SeguridadPerfiles.findByIdAndUpdate({ _id }, { IS_MANAGEABLE: false, ESTADO: true })
        
        return res.status(201).json({
          error: false,
          status: 201,
          statusText: "Recuerda: este perfil no se puede editar"
        })
      } else {
        if (NOMBRE_PERFIL.toLowerCase() === "administrador" || NOMBRE_PERFIL.toLowerCase() === "docente" || NOMBRE_PERFIL.toLowerCase() === "estudiante") {
          throw({
            error: true,
            status: 401,
            statusText: "Este nombre de perfiles es reservados por el sistema, intenta crear con otro nombre"
          })
        }
      }

      await SeguridadPerfiles.findByIdAndUpdate({ _id }, { NOMBRE_PERFIL, IS_MANAGEABLE, ESTADO })
      const validId = UtilComponents.ValidarObjectIdValido(_id); if (validId) throw(validId)
      res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE
      })  
    } else { // SAVE
      if (isReservado) {
        if (NOMBRE_PERFIL.toLowerCase() === "administrador" || NOMBRE_PERFIL.toLowerCase() === "docente" || NOMBRE_PERFIL.toLowerCase() === "estudiante") {
          throw({
            error: true,
            status: 401,
            statusText: "Este nombre de perfiles es reservados por el sistema, intenta crear con otro nombre"
          })
        }

        await SeguridadPerfiles.findByIdAndUpdate({ _id }, { IS_MANAGEABLE: true, ESTADO: true })
        
        return res.status(201).json({
          error: false,
          status: 201,
          statusText: "Recuerda: este perfil no se puede editar"
        })
      }
      
      const dataSave = new SeguridadPerfiles({NOMBRE_PERFIL, IS_MANAGEABLE: true, ESTADO});
      await dataSave.save();
      res.status(201).json({
        error: false,
        status: 201,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE
      })
    }
  } catch (err) {
    console.log(err)
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