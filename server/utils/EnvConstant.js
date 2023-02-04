const { config } = require("dotenv");
config();

const APP_DEVELOPMENT       = false;

// Desarrollo
const APP_DEV_DATABASE_URI   = process.env.APP_DEV_DATABASE_URI;
const APP_DEV_PATH_BACKEND   = process.env.APP_DEV_PATH_BACKEND;
const APP_DEV_PATH_UPLOAD    = process.env.APP_DEV_PATH_UPLOAD;
const APP_DEV_PORT           = process.env.APP_DEV_PORT;

// Produccion
const APP_PROD_DATABASE_URI  = process.env.APP_PROD_DATABASE_URI;
const APP_PROD_PATH_BACKEND  = process.env.APP_PROD_PATH_BACKEND;
const APP_PROD_PATH_UPLOAD   = process.env.APP_PROD_PATH_UPLOAD;
const APP_PROD_PORT          = process.env.APP_PROD_PORT;

// Configuracion Rasseto
const EnvConstant = {
    APP_DATABASE_URI  : APP_DEVELOPMENT   ?  APP_DEV_DATABASE_URI   :  APP_PROD_DATABASE_URI,
    APP_PATH_BACKEND  : APP_DEVELOPMENT   ?  APP_DEV_PATH_BACKEND   :  APP_PROD_PATH_BACKEND,
    APP_PATH_UPLOAD   : APP_DEVELOPMENT   ?  APP_DEV_PATH_UPLOAD    :  APP_PROD_PATH_UPLOAD,
    APP_PORT          : APP_DEVELOPMENT   ?  APP_DEV_PORT           :  APP_PROD_PORT,
}

module.exports = EnvConstant