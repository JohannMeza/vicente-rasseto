/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const SeguridadUsuarios = require("../../models/seguridad/seguridad_usuarios.model");
const AdministracionNivelEstudio = require("../../models/administracion/administracion_nivel_estudio.model");
const Login = require("../../models/auth/login.model");
const UtilComponents = require("../../utils/UtilsComponents");
const SeguridadPerfiles = require("../../models/seguridad/seguridad_perfiles.model");
const bcrypt = require("bcrypt")
const xl = require("exceljs")

const index = async (req, res) => {
  try {
    let campos = { NIVEL_ESTUDIO: "label", _id: "value" };
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_USUARIO, ESTADO, EMAIL, DNI } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_USUARIO, ESTADO, DNI })

    const perfilDocente = await SeguridadPerfiles.findOne({ NOMBRE_PERFIL: { $in: [/docente/i ] }});
    let dataAlumnos = await SeguridadUsuarios.paginate({...dataFilter, ID_PERFILES: perfilDocente._id }, { limit: rowsPerPage, page, populate: [{path: 'ID_LOGIN'}] })

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
    const perfilDocente = await SeguridadPerfiles.findOne({ NOMBRE_PERFIL: { $in: [/docente/i ] }});
    let PASS_DECRYPT = "";

    if (!perfilDocente) {
      throw({
        err: true,
        statusText: "No existe perfil de Docente, crealo o comuniquese con el administrador",
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

      const nuevoLogin = new Login({ EMAIL, PASSWORD })
      await nuevoLogin.save();

      const dataLogin = await Login.find().sort({$natural:-1}).limit(1);
      const idLogin = dataLogin[0]._id
      
      const nuevoUsuario = new SeguridadUsuarios({ NOMBRE_USUARIO, ESTADO, ID_LOGIN: idLogin, ID_PERFILES: perfilDocente._id, DNI })
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

const reporteExcel = async (req, res) => {
  try {
    const { NOMBRE_USUARIO, ESTADO, EMAIL, DNI } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_USUARIO, ESTADO, DNI })
    const perfilDocente = await SeguridadPerfiles.findOne({ NOMBRE_PERFIL: { $in: [/docente/i ] }});

    let dataAlumnos = await SeguridadUsuarios.paginate({...dataFilter, ID_PERFILES: perfilDocente._id }, { populate: [{path: 'ID_LOGIN'}] })
    let arrFilterDocentes = dataAlumnos.docs

    if (EMAIL) arrFilterDocentes = arrFilterDocentes.filter(el => el.ID_LOGIN.EMAIL === EMAIL)

    // Estilo del Excel
    let workbook = new xl.Workbook();
    let worksheet = workbook.addWorksheet('Worksheet');

    res.setHeader('Access-Control-Expose-Headers', "Content-Disposition"); //IMPORTANT FOR React.js content-disposition get Name
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    res.setHeader("Content-Disposition", `attachment; filename=Reporte Docentes ${new Date().toLocaleDateString()}.xlsx`)
    
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('B1').alignment = { horizontal: 'center' };
    worksheet.getCell('C1').alignment = { horizontal: 'center' };
    worksheet.getCell('D1').alignment = { horizontal: 'center' };
    worksheet.getCell('E1').alignment = { horizontal: 'center' };
    worksheet.getRow(1).font = { size: 12, bold: true };

    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 20 },
      { header: 'DNI', key: 'dni', width: 20 },
      { header: 'Email', key: 'email', width: 20 },
    ];

    arrFilterDocentes.forEach((el) => {
      worksheet.addRow({
        nombre: el.NOMBRE_USUARIO, 
        dni: el.DNI,
        email: el.ID_LOGIN.EMAIL
      });
    })
    
    return workbook.xlsx.write(res).then(() => res.status(200).end())
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

module.exports = {
  index,
  store,
  reporteExcel
}