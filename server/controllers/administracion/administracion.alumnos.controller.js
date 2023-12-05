/* eslint-disable no-throw-literal */
const MessageConstants = require("../../constants/message");
const SeguridadUsuarios = require("../../models/seguridad/seguridad_usuarios.model");
const AdministracionNivelEstudio = require("../../models/administracion/administracion_nivel_estudio.model");
const AdministracionGrados = require("../../models/administracion/administracion_grados.model");
const Login = require("../../models/auth/login.model");
const UtilComponents = require("../../utils/UtilsComponents");
const SeguridadPerfiles = require("../../models/seguridad/seguridad_perfiles.model");
const xl = require("exceljs")
const bcrypt = require("bcrypt")
const XLSX = require('xlsx');

const index = async (req, res) => {
  try {
    let campos = { NIVEL_ESTUDIO: "label", _id: "value" };
    const { rowsPerPage, page } = req.body;
    const { NOMBRE_USUARIO, DNI, ESTADO, ID_NIVEL_ESTUDIO, EMAIL, ID_GRADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_USUARIO, DNI, ESTADO })

    const perfilEstudiante = await SeguridadPerfiles.findOne({ NOMBRE_PERFIL: { $in: [/estudiante/i ] }});
    // let dataAlumnos = await SeguridadUsuarios.paginate({...dataFilter, ID_PERFILES: perfilEstudiante._id }, { populate: [{path: 'ID_LOGIN'}, { path: "ID_GRADO", populate: { path: "ID_NIVEL_ESTUDIO" } }] })
    // let arrFilterAlumnos = dataAlumnos.docs
    let dataAlumnos = await SeguridadUsuarios.find({...dataFilter, ID_PERFILES: perfilEstudiante._id }).populate("ID_LOGIN").populate({ path: "ID_GRADO", populate: "ID_NIVEL_ESTUDIO" })
    let arrFilterAlumnos = dataAlumnos

    if (ID_NIVEL_ESTUDIO) {
      arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_GRADO.ID_NIVEL_ESTUDIO._id.toString() === ID_NIVEL_ESTUDIO )
    }

    if (ID_GRADO) {
      arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_GRADO._id.toString() === ID_GRADO )
    }

    if (EMAIL) {
      arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_LOGIN.EMAIL === EMAIL )
    }

    const pagination = {
      limit: rowsPerPage,
      page: page - 1,
      totalDocs: arrFilterAlumnos.length
    }

    arrFilterAlumnos = arrFilterAlumnos.slice(pagination.page * rowsPerPage, pagination.page * rowsPerPage + rowsPerPage)
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
      rowsPerPage: pagination.limit,
      page: pagination.page,
      count: pagination.totalDocs
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
    const { _id: ID_LOGIN } = req.body.ID_LOGIN ? req.body.ID_LOGIN : { _id: null };
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

const reporteExcel = async (req, res) => {
  try {
    const { NOMBRE_USUARIO, DNI, ESTADO, ID_NIVEL_ESTUDIO, EMAIL, ID_GRADO } = req.body;
    const dataFilter = UtilComponents.ValidarObjectForFilter({ NOMBRE_USUARIO, DNI, ESTADO })
    const perfilEstudiante = await SeguridadPerfiles.findOne({ NOMBRE_PERFIL: { $in: [/estudiante/i ] }});
    // let dataAlumnos = await SeguridadUsuarios.paginate({...dataFilter, ID_PERFILES: perfilEstudiante._id }, { populate: [{path: 'ID_LOGIN'}, { path: "ID_GRADO", populate: { path: "ID_NIVEL_ESTUDIO" } }] })
    // let arrFilterAlumnos = dataAlumnos.docs
    let dataAlumnos = await SeguridadUsuarios.find({...dataFilter, ID_PERFILES: perfilEstudiante._id }).populate("ID_LOGIN").populate({ path: "ID_GRADO", populate: "ID_NIVEL_ESTUDIO" })
    let arrFilterAlumnos = dataAlumnos

    if (ID_NIVEL_ESTUDIO) arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_GRADO.ID_NIVEL_ESTUDIO._id.toString() === ID_NIVEL_ESTUDIO )
    if (ID_GRADO) arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_GRADO._id.toString() === ID_GRADO )
    if (EMAIL) arrFilterAlumnos = arrFilterAlumnos.filter(el => el.ID_LOGIN.EMAIL === EMAIL )

    // Estilo del Excel
    let workbook = new xl.Workbook();
    let worksheet = workbook.addWorksheet('Worksheet');

    res.setHeader('Access-Control-Expose-Headers', "Content-Disposition"); //IMPORTANT FOR React.js content-disposition get Name
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    res.setHeader("Content-Disposition", `attachment; filename=Reporte Alumnos ${new Date().toLocaleDateString()}.xlsx`)
    
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('B1').alignment = { horizontal: 'center' };
    worksheet.getCell('C1').alignment = { horizontal: 'center' };
    worksheet.getCell('D1').alignment = { horizontal: 'center' };
    worksheet.getCell('E1').alignment = { horizontal: 'center' };

    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 20 },
      { header: 'DNI', key: 'dni', width: 20 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'Nivel Educativo', key: 'nivel_educativo', width: 20 },
      { header: 'Grado', key: 'grado', width: 20  }
    ];
    
    worksheet.getRow(1).font = { size: 12, bold: true };
    
    arrFilterAlumnos.forEach((el) => {
      worksheet.addRow({
        nombre: el.NOMBRE_USUARIO, 
        dni: el.DNI,
        email: el.ID_LOGIN.EMAIL, 
        nivel_educativo: el.ID_GRADO.ID_NIVEL_ESTUDIO?.NIVEL_ESTUDIO, 
        grado: el.ID_GRADO.GRADO
      });
    })
    
    
    return workbook.xlsx.write(res).then(() => res.status(200).end())
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const dataAlumnos = [
  {
    "NOMBRE_USUARIO": "Adriana Mendoza",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Carlos Huamán",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Gabriela Ramos",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Jorge Pérez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Mariana Sánchez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Luis Díaz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Valeria Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Martín Flores",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Natalia Castillo",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Renato Vargas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Alejandra Gonzales",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Raúl Quispe",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Patricia Jiménez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Diego Espinoza",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Lucía Chávez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Andrés Rivera",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Daniela Córdova",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Juan Silva",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Camila Salazar",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "José Luna",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Valentina Rojas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Ricardo Cárdenas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Paola Gómez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Bruno Medina",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Estefanía Cruz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Víctor Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Diana Rodríguez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Óscar Linares",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Sofía Palomino",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Franklin González",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Isabella Flores",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Christian Vela",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Vanessa Paredes",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Marco Soto",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Fernanda Castro",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Pablo Álvarez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Jazmín Guzmán",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Sergio Herrera",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Gabriela Morales",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Alonso Guzmán",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Brenda Romero",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Gustavo Peña",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Alejandra Ortega",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Eduardo Arévalo",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Adriana Vargas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Gabriel Salas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Victoria Mendoza",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Oscar Navarro",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Carmen Cabrera",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Esteban Ramos",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Julia Huamán",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Miguel Rojas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Laura Zavaleta",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Raúl Flores",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Maritza Pérez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Juan Mendoza",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Karla Gutiérrez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Manuel Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Patricia Quiroz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Alex Rivera",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e"
  },
  {
    "NOMBRE_USUARIO": "Antonella Aguilar",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Gustavo Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Lorena Valenzuela",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Sebastián Vásquez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Mariana Suárez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Mario Ramos",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Fiorella Córdova",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Renzo Sánchez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Carla Flores",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Carlos González",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Valeria Maldonado",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Martín Espinoza",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Fernanda Pérez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Gustavo López",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Paola Medina",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },

  {
    "NOMBRE_USUARIO": "Richard Córdova",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Ana Valderrama",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Franco Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Pamela Castillo",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Fernando Rojas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Karen García",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Andrés Salazar",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Carla Rodríguez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Eduardo Mendoza",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Andrea Soto",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Iván Medina",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Yessenia Morales",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Leonardo García",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "María Salas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Bryan Cárdenas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Camila Herrera",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Erick Pérez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Claudia López",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Alex Vargas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Natalia Chávez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "René Sánchez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Nicole Díaz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Juan Carlos Suárez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Maritza Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Joel Vela",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Verónica Sánchez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Pedro Cruz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Susana Jiménez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Edwin Valenzuela",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Diana Quiroz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },

  {
    "NOMBRE_USUARIO": "Jorge Flores",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Gabriela Gutiérrez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Cristian Medina",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Valentina Palomino",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Luis Pérez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Fiorella Zavaleta",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Alberto Rojas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Stephanie Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Kevin Córdova",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "María Valderrama",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Miguel Ángel Ramos",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Mariana Suárez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Gonzalo Salas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Viviana Medina",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Eduardo Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Carmen Huamán",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Bruno Díaz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Andrea Vásquez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Junior Rodríguez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Gabriela Córdova",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "José Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Pamela Mendoza",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Fernando Quiroz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Karen Flores",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Luis Soto",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Mónica Pérez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Sergio González",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Diana Sánchez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Renato Cárdenas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Patricia Guzmán",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Gustavo Salazar",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Vanessa Ramos",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Bruno Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Estefanía Gómez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Alex Medina",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Jazmín Chávez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Oscar Vargas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "María Castillo",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "David Suárez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Karla Pérez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Andrés Gonzales",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Valentina Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Christian Rojas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Mariana Soto",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Alonso Flores",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "ID_GRADO": "633140eb6afbcf1f23c42a1b",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a2972e2f02366f422c1e",
    "NIVEL": "primaria"
  },
  {
    "NOMBRE_USUARIO": "Alejandro Ramos",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Carla Gonzales",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Luis Torres",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Andrea Salazar",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Marco Vargas",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Camila Huaman",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Diego Fernandez",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Mariana Diaz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Renato Castro",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Valeria Paredes",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Juan Flores",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  },
  {
    "NOMBRE_USUARIO": "Daniela Cruz",
    "ESTADO": true,
    "DNI": "",
    "EMAIL": "@vicenterasseto.edu.pe",
    "PASSWORD": "",
    "ID_PERFILES": "62b2a28f2e2f02366f422c1c"
  }
]

function generarNumerosUnicos(cantidad, longitud) {
  const numerosGenerados = new Set();

  while (numerosGenerados.size < cantidad) {
    const nuevoNumero = Array.from({ length: longitud }, () => Math.floor(Math.random() * 10)).join('');
    numerosGenerados.add(nuevoNumero);
  }

  return Array.from(numerosGenerados);
}

const importarExcel = async (req, res) => {
  const numerosUnicos = generarNumerosUnicos(162, 8);
  const grados = [ "633140f66afbcf1f23c42a27", "633140fb6afbcf1f23c42a2b", "633140ff6afbcf1f23c42a2f", "633141046afbcf1f23c42a33", "633141096afbcf1f23c42a37", "6331410e6afbcf1f23c42a3b" ];
  try {
    const arr = dataAlumnos.map(async (el, index) => { 
      const nivel = el.NIVEL === "primaria" ? true : false;
      const salt = await bcrypt.genSalt(10);
      const DNI = numerosUnicos[index];
      const password = bcrypt.hashSync(DNI, salt);
      const loginobj = { EMAIL: DNI + el.EMAIL, PASSWORD: password }
      
      const login = new Login(loginobj);
      return login.save().then(async resp => {
        if (nivel) { // ESTUDIANTE PRIMARIA
          const idGrado = Math.floor(Math.random() * 6);
  
          const objData = { 
            NOMBRE_USUARIO: el.NOMBRE_USUARIO, 
            ESTADO: el.ESTADO, 
            DNI: DNI + el.DNI, 
            ID_LOGIN: resp._id, 
            ID_PERFILES: el.ID_PERFILES, 
            ID_GRADO: grados[idGrado] 
          }
          
          const dataObj = new SeguridadUsuarios(objData);
          await dataObj.save()
        } else { // OTRO
          const objData = { 
            NOMBRE_USUARIO: el.NOMBRE_USUARIO, 
            ESTADO: el.ESTADO, 
            DNI: DNI + el.DNI, 
            ID_LOGIN: resp._id, 
            ID_PERFILES: el.ID_PERFILES, 
            ID_GRADO: el.ID_GRADO 
          }
          
          const dataObj = new SeguridadUsuarios(objData);
          await dataObj.save()
        }
      })
    });

    await Promise.all(arr)
    
    return res.status(201).json({
      error: false,
      status: 201,
      statusText: MessageConstants.MESSAGE_IMPORT_DATA
    })
  } catch (err) {
    console.log(err)
    return res.status(err.status || 500).json({ statusText: "Error en la importacion", ...err })
  }
}

module.exports = {
  index,
  store,
  getGradosLabel,
  reporteExcel,
  importarExcel
}