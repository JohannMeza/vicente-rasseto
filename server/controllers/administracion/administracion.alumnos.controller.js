/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const SeguridadUsuarios = require("../../models/seguridad/seguridad_usuarios.model");
const AdministracionNivelEstudio = require("../../models/administracion/administracion_nivel_estudio.model");
const AdministracionGrados = require("../../models/administracion/administracion_grados.model");
const Login = require("../../models/auth/login.model");
const UtilComponents = require("../../utils/UtilsComponents");

const index = async (req, res) => {
  try {
    let campos = { NIVEL_ESTUDIO: "label", _id: "value" };
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_USUARIO, DNI, ESTADO, ID_NIVEL_ESTUDIO, EMAIL, ID_GRADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_USUARIO, DNI, ESTADO })
    let dataAlumnos = await SeguridadUsuarios.paginate({...dataFilter, ID_PERFILES: "62b2a2972e2f02366f422c1e" }, { limit: rowsPerPage, page, populate: [{path: 'ID_LOGIN'}, { path: "ID_GRADO", populate: { path: "ID_NIVEL_ESTUDIO" } }] })

    let arrFilterAlumnos = dataAlumnos.docs

    if (ID_NIVEL_ESTUDIO) {
      arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_GRADO.ID_NIVEL_ESTUDIO._id.toString() === ID_NIVEL_ESTUDIO )
    }

    if (ID_GRADO) {
      arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_GRADO._id.toString() === ID_GRADO )
    }

    if (EMAIL) {
      arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_LOGIN.EMAIL === EMAIL )
    }

    const perfilLabel = await AdministracionNivelEstudio.find({ ESTADO: true }, { NIVEL_ESTUDIO: 1, _id: 1 })
    const arrPerfil = UtilComponents.CambiarNombreCampos(perfilLabel, campos)

    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: {
        alumnos: arrFilterAlumnos,
        perfiles: arrPerfil
      },
      rowsPerPage: dataAlumnos.limit,
      page: dataAlumnos.page,
      count: dataAlumnos.totalDocs
    })
  } catch (err) {
    console.log(err)
    return res.status(err.status || 500).json({ ...err })
  }
}

const getGradosLabel = async (req, res) => {
  try {
    const { id } = req.body;
    let campos = { GRADO: "label", _id: "value" };
    const validId = UtilComponents.ValidarObjectIdValido(id)
    if (validId) throw(validId)
    const dataGrados = await AdministracionGrados.find({ ESTADO: true, ID_NIVEL_ESTUDIO: id }, { GRADO: 1, _id: 1 })
    const arrGrados = UtilComponents.CambiarNombreCampos(dataGrados, campos)
    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: arrGrados
    })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const store = async (req, res) => {
  try {
    const { NOMBRE_USUARIO, ESTADO, DNI, _id, EMAIL, ID_GRADO } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({ NOMBRE_USUARIO, ESTADO, DNI })
    if (validData) throw(validData)

    if (_id) { // UPDATE
      await SeguridadUsuarios.findOneAndUpdate({ _id }, { NOMBRE_USUARIO, ESTADO, DNI, ID_GRADO })
      return res.status(201).json({
        error: false,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE,
        status: 201
      })
    } else { // SAVE
      const validarEmail = await Login.findOne({ EMAIL });
      if (validarEmail) throw({
        error: true,
        statusText: "El Email ingresado ya existe",
        status: 401
      })

      const nuevoLogin = new Login({ EMAIL, PASSWORD: DNI })
      await nuevoLogin.save();

      const dataLogin = await Login.find().sort({$natural:-1}).limit(1);
      const idLogin = dataLogin[0]._id
      
      const nuevoUsuario = new SeguridadUsuarios({ NOMBRE_USUARIO, ESTADO, DNI, ID_LOGIN: idLogin, ID_PERFILES: "62b2a2972e2f02366f422c1e", ID_GRADO })
      await nuevoUsuario.save()
      return res.status(201).json({
        error: false,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE,
        status: 201
      })
    }
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

module.exports = {
  index,
  store,
  getGradosLabel
}