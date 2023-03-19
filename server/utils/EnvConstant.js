const { config } = require("dotenv");
config();

// Desarrollo
const APP_DEV_DATABASE_URI          = process.env.APP_DEV_DATABASE_URI;
const APP_DEV_PATH_BACKEND          = process.env.APP_DEV_PATH_BACKEND;
const APP_DEV_PATH_UPLOAD           = process.env.APP_DEV_PATH_UPLOAD;
const APP_DEV_PORT                  = process.env.APP_DEV_PORT;
const APP_DEV_TOKEN                 = process.env.APP_DEV_TOKEN;
const APP_DEV_REPOSITORIO_LIBROS    = process.env.APP_DEV_REPOSITORIO_LIBROS;

// Produccion
const APP_PROD_DATABASE_URI         = process.env.APP_PROD_DATABASE_URI;
const APP_PROD_PATH_BACKEND         = process.env.APP_PROD_PATH_BACKEND;
const APP_PROD_PATH_UPLOAD          = process.env.APP_PROD_PATH_UPLOAD;
const APP_PROD_PORT                 = process.env.APP_PROD_PORT;
const APP_PROD_TOKEN                = process.env.APP_PROD_TOKEN;
const APP_PROD_REPOSITORIO_LIBROS   = process.env.APP_PROD_REPOSITORIO_LIBROS;

// Configuracion
const APP_CLOUDINARY_NAME        = process.env.APP_CLOUDINARY_NAME;
const APP_CLOUDINARY_KEY         = process.env.APP_CLOUDINARY_KEY;
const APP_CLOUDINARY_API_SECRET = process.env.APP_CLOUDINARY_API_SECRET;

const ValidarEntorno = (env) => {
  if (env === 'desarrollo') return true
  else if (env === 'produccion') return false
  else return null
}

// Configuracion Rasseto
const EnvConstant = {
    APP_DATABASE_URI            : ValidarEntorno(process.env.APP_ENV)    ?   APP_DEV_DATABASE_URI         :   APP_PROD_DATABASE_URI,
    APP_PATH_BACKEND            : ValidarEntorno(process.env.APP_ENV)    ?   APP_DEV_PATH_BACKEND         :   APP_PROD_PATH_BACKEND,
    APP_PATH_UPLOAD             : ValidarEntorno(process.env.APP_ENV)    ?   APP_DEV_PATH_UPLOAD          :   APP_PROD_PATH_UPLOAD,
    APP_PORT                    : ValidarEntorno(process.env.APP_ENV)    ?   APP_DEV_PORT                 :   APP_PROD_PORT,
    APP_TOKEN                   : ValidarEntorno(process.env.APP_ENV)    ?   APP_DEV_TOKEN                :   APP_PROD_TOKEN,
    APP_REPOSITORIO_LIBROS      : ValidarEntorno(process.env.APP_ENV)    ?   APP_DEV_REPOSITORIO_LIBROS   :   APP_PROD_REPOSITORIO_LIBROS,
    APP_CLOUDINARY_NAME         : APP_CLOUDINARY_NAME,
    APP_CLOUDINARY_KEY          : APP_CLOUDINARY_KEY,
    APP_CLOUDINARY_API_SECRET   : APP_CLOUDINARY_API_SECRET,
}

module.exports = EnvConstant
