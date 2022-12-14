/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const SeguridadUsuarios = require("../../models/seguridad/seguridad_usuarios.model");
const AdministracionNivelEstudio = require("../../models/administracion/administracion_nivel_estudio.model");
const AdministracionGrados = require("../../models/administracion/administracion_grados.model");
const Login = require("../../models/auth/login.model");
const UtilComponents = require("../../utils/UtilsComponents");
const SeguridadPerfiles = require("../../models/seguridad/seguridad_perfiles.model");
const bcrypt = require("bcrypt")

const index = async (req, res) => {
  try {
    let campos = { NIVEL_ESTUDIO: "label", _id: "value" };
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_USUARIO, DNI, ESTADO, ID_NIVEL_ESTUDIO, EMAIL, ID_GRADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_USUARIO, DNI, ESTADO })

    const perfilEstudiante = await SeguridadPerfiles.findOne({ NOMBRE_PERFIL: { $in: [/estudiante/i ] }});
    let dataAlumnos = await SeguridadUsuarios.paginate({...dataFilter, ID_PERFILES: perfilEstudiante._id }, { limit: rowsPerPage, page, populate: [{path: 'ID_LOGIN'}, { path: "ID_GRADO", populate: { path: "ID_NIVEL_ESTUDIO" } }] })
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
    let { NOMBRE_USUARIO, ESTADO, DNI, EMAIL, _id, ID_GRADO, PASSWORD } = req.body;
    const { _id: ID_LOGIN } = req.body.ID_LOGIN;
    if (!PASSWORD) PASSWORD = DNI
    
    const validData = UtilComponents.ValidarParametrosObligatorios({ NOMBRE_USUARIO, ESTADO, DNI, PASSWORD })
    if (validData) throw(validData)
    const perfilEstudiante = await SeguridadPerfiles.findOne({ NOMBRE_PERFIL: { $in: [/estudiante/i ] }});
    let PASS_DECRYPT = "";

    if (!perfilEstudiante) {
      throw({
        err: true,
        statusText: "No existe perfil de estudiante, crealo o comuniquese con el administrador",
        status: 401
      })
    }

    if (_id) { // UPDATE
      const salt = await bcrypt.genSalt(10);
      PASS_DECRYPT = bcrypt.hashSync(PASSWORD, salt);
      const isValidateLogin = await Login.findOne({ EMAIL: EMAIL, _id: {$ne: ID_LOGIN} });
      if (isValidateLogin) throw({
        error: true,
        status: 401,
        statusText: "El EMAIL ingresado ya existe",
      })
      
      await SeguridadUsuarios.findOneAndUpdate({ _id }, { NOMBRE_USUARIO, ESTADO, DNI, ID_GRADO })
      await Login.findOneAndUpdate({ _id: ID_LOGIN }, { EMAIL: EMAIL, PASSWORD: PASS_DECRYPT })

      return res.status(201).json({
        error: false,
        statusText: MessageConstants.MESSAGE_SUCCESS_UPDATE,
        status: 201
      })
    } else { // SAVE
      const salt = await bcrypt.genSalt(10);
      PASS_DECRYPT = bcrypt.hashSync(PASSWORD, salt);

      const isValidateLogin = await Login.findOne({ EMAIL });
      if (isValidateLogin) throw({
        error: true,
        status: 401,
        statusText: "El EMAIL ingresado ya existe",
      })

      const validarEmail = await Login.findOne({ EMAIL });
      if (validarEmail) throw({
        error: true,
        statusText: "El Email ingresado ya existe",
        status: 401
      })

      const nuevoLogin = new Login({ EMAIL, PASSWORD: PASS_DECRYPT })
      await nuevoLogin.save();

      const dataLogin = await Login.find().sort({$natural:-1}).limit(1);
      const idLogin = dataLogin[0]._id
      
      const nuevoUsuario = new SeguridadUsuarios({ NOMBRE_USUARIO, ESTADO, DNI, ID_LOGIN: idLogin, ID_PERFILES: perfilEstudiante._id, ID_GRADO })
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