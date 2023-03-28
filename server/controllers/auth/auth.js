/* eslint-disable no-throw-literal */
const Login = require("../../models/auth/login.model");
const SeguridadUsuarios = require("../../models/seguridad/seguridad_usuarios.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const SeguridadPerfilesMenuSubmenu = require("../../models/seguridad/seguridad_perfiles_menu_submenu.model");

// productInfoSchema.pre('remove', function(next) {
//   Image.remove({ _id: { $in: this.image } }).exec();
//   next();
// });

/**
 * @param {*} req 
 * EMAIL
 * PASSWORD
 * @return {*} 
 * Verifica si un Usuario existe en la BD
 * Loguea al usuario
 */
const signIn = async (req, res) => {
  try {
    const { EMAIL, PASSWORD } = req.body;
    if (!EMAIL) throw({
      error: true, 
      status: 401,
      statusText: "El campo EMAIL es obligatorio"
    })
    if (!PASSWORD) throw({
      error: true, 
      status: 401,
      statusText: "El campo CONTRASEÑA es obligatorio"
    })
    
    const user = await Login.findOne({ EMAIL });
    if (!user) throw({
      error: true,
      status: 401,
      statusText: "Usuario no encontrado"
    })

    const passwordDecript = bcrypt.compareSync(PASSWORD, user.PASSWORD);
    if (!passwordDecript) throw({
      error: true,
      status: 401,
      statusText: "La contraseña no es correcta"
    })

    const token = jwt.sign({ EMAIL }, config.jwt.SECRET_KEY, {
      expiresIn: 86400 * 7 // 24 horas * 7 dias
    })

    res.status(201).json({ 
      error: false,
      status: 201,
      statusText: "Se ha logueado con éxito",
      data: user,
      token
     })
  } catch (err) {
    console.log(err)
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {*} req
 * EMAIL
 * @returns {*}
 * Esta funcion permite crear un nuevo usuario, solo esta funcion 
 * esta disponible para el administrador 
 */
const signUp = async (req, res) => {
  try {
    const { EMAIL, PASSWORD, ID_PERFILES, NOMBRE_USUARIO } = req.body;
    if (!EMAIL) throw({
      error: true,
      status: 401,
      statusText: "El campo EMAIL es obligatorio",
    })
    
    if (!PASSWORD) throw({
      error: true,
      status: 401,
      statusText: "El campo CONTRASEÑA es obligatorio",
    })

    if (!ID_PERFILES) throw({
      error: true,
      status: 401,
      statusText: "El campo PERFIL es obligatorio",
    })

    if (!NOMBRE_USUARIO) throw({
      error: true,
      status: 401,
      statusText: "El campo NOMBRE USUARIO es obligatorio",
    })

    const salt = await bcrypt.genSalt(10);
    req.body.PASSWORD = bcrypt.hashSync(PASSWORD, salt);

    const isValidateLogin = await Login.findOne({ EMAIL });
    if (isValidateLogin) throw({
      error: true,
      status: 401,
      statusText: "El EMAIL ingresado ya existe",
    })

    const loginRegister = new Login({ EMAIL: req.body.EMAIL, PASSWORD: req.body.PASSWORD });
    await loginRegister.save();

    const lastLoginRegister  = await Login.findOne({}, {_id: 1}).sort({ $natural: -1 }).limit(1);
    const userRegister = new SeguridadUsuarios({ 
      ID_LOGIN: lastLoginRegister._id,
      ID_PERFILES,
      PASSWORD: req.body.PASSWORD,
      NOMBRE_USUARIO
    });

    await userRegister.save();
    res.status(201).json({ 
      error: false,
      status: 201,
      statusText: "Se ha registrado con éxito"
     })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {*} req 
 * EMAIL
 * @return {*}
 * Verifica si el usuario esta logueado,
 * si no esta logueado returna al login y si 
 * esta logueado retorna al home
 */

const isLogin = async (req, res) => {
  try {
    const { EMAIL } = req.body;
    const { _id } = await Login.findOne({ EMAIL });
    let userAccess = await SeguridadUsuarios.findOne({ ID_LOGIN: _id }).populate('ID_PERFILES');
    if (!userAccess) throw({
      error: true,
      statusText: "Token alterado",
      status: 401
    })

    const ID_PERFIL = userAccess.ID_PERFILES._id
    const menusAndSubmenus = await SeguridadPerfilesMenuSubmenu.find({ ID_SEGURIDAD_PERFILES: ID_PERFIL }).populate({path: 'ID_CONFIGURACION_MENU', options: { sort: { ORDEN: -1 } }}).populate({path: 'ID_CONFIGURACION_SUBMENU', options: { sort: { ORDEN: 1 } }})
    const menusOrdenados = menusAndSubmenus.sort((a, b) => a.ID_CONFIGURACION_MENU.ORDEN - b.ID_CONFIGURACION_MENU.ORDEN);
    
    let perfil = userAccess.ID_PERFILES.NOMBRE_PERFIL;
    if (perfil.toLowerCase() === "administrador") {
      let user = userAccess._doc;
      userAccess = {
        ...user,
        ADMIN: true
      }
    } else {
      let user = userAccess._doc;
      userAccess = {
        ...user,
        ADMIN: false
      }
    }

    res.status(201).json({ data: {userAccess, menusAndSubmenus: menusOrdenados} })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

/**
 * 
 * @param {*} req 
 * USER
 * @return {*}
 * Trae todas las rutas del usuario
 */

const getPathUser = async (req, res) => {
  try {
    const { id } = req.params;
    const path = await SeguridadPerfilesMenuSubmenu.find({ ID_SEGURIDAD_PERFILES: id }).populate("ID_CONFIGURACION_SUBMENU")
    res.status(201).json({ data: path })
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

const signRemove = async (req, res) => {
    // const { id } = req.params;
  // try {
  //   const { id } = req.params;
  //   const resDelete = await Login.deleteOne({_id: id})
  //   Login.remove()
  //   res.json({ resDelete })
  // } catch (err) {
  //   return res.json({ err })
  // }


  Login.findById(req.params.id, function(err, client) {
    // if (err)
    //     return next(new restify.InternalError(err));
    // else if (!client)
    //     return next(new restify.ResourceNotFoundError('The resource you requested could not be found.'));

    // find and remove all associated sweepstakes
    // Sweepstakes.find({client_id: client._id}).remove();

    // find and remove all submissions
    // Submission.find({client_id: client._id}).remove();

    client.remove();

    res.send({id: req.params.id});

  });
}

module.exports = {
  signIn,
  signUp,
  isLogin,
  getPathUser,
  signRemove
}