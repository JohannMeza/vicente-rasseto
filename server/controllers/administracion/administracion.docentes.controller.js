/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/Message");
const SeguridadUsuarios = require("../../models/seguridad/seguridad_usuarios.model");
const AdministracionNivelEstudio = require("../../models/administracion/administracion_nivel_estudio.model");
const Login = require("../../models/auth/login.model");
const UtilComponents = require("../../utils/UtilsComponents");

const index = async (req, res) => {
  try {
    let campos = { NIVEL_ESTUDIO: "label", _id: "value" };
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_USUARIO, ESTADO, EMAIL, DNI } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_USUARIO, ESTADO, DNI })
    let dataAlumnos = await SeguridadUsuarios.paginate({...dataFilter, ID_PERFILES: "62b2a28f2e2f02366f422c1c" }, { limit: rowsPerPage, page, populate: [{path: 'ID_LOGIN'}] })

    let arrFilterDocentes = dataAlumnos.docs

    if (EMAIL) {
      arrFilterDocentes = arrFilterDocentes.filter(el => el.ID_LOGIN.EMAIL === EMAIL )
    }

    const perfilLabel = await AdministracionNivelEstudio.find({ ESTADO: true }, { NIVEL_ESTUDIO: 1, _id: 1 })
    const arrPerfil = UtilComponents.CambiarNombreCampos(perfilLabel, campos)

    res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.REQUEST_SUCCESS,
      data: {
        docentes: arrFilterDocentes,
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

const store = async (req, res) => {
  try {
    const { NOMBRE_USUARIO, ESTADO, _id, EMAIL, DNI } = req.body;
    const validData = UtilComponents.ValidarParametrosObligatorios({ NOMBRE_USUARIO, ESTADO, DNI })
    if (validData) throw(validData)

    if (_id) { // UPDATE
      await SeguridadUsuarios.findOneAndUpdate({ _id }, { NOMBRE_USUARIO, ESTADO, DNI })
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

      const nuevoLogin = new Login({ EMAIL, PASSWORD: '123' })
      await nuevoLogin.save();

      const dataLogin = await Login.find().sort({$natural:-1}).limit(1);
      const idLogin = dataLogin[0]._id
      
      const nuevoUsuario = new SeguridadUsuarios({ NOMBRE_USUARIO, ESTADO, ID_LOGIN: idLogin, ID_PERFILES: "62b2a28f2e2f02366f422c1c", DNI })
      await nuevoUsuario.save()
      return res.status(201).json({
        error: false,
        statusText: MessageConstants.MESSAGE_SUCCESS_SAVE,
        status: 201
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(err.status || 500).json({ ...err })
  }
}

module.exports = {
  index,
  store
}