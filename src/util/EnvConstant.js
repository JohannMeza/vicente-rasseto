// Desarrollo
const REACT_APP_DEV_PATH_UPLOAD    = process.env.REACT_APP_DEV_PATH_UPLOAD;
const REACT_APP_DEV_BASE_URL       = process.env.REACT_APP_DEV_BASE_URL;
const REACT_APP_DEV_PDFJS_KEY      = process.env.REACT_APP_DEV_PDFJS_KEY;

// Produccion
const REACT_APP_PROD_PATH_UPLOAD     = process.env.REACT_APP_PROD_PATH_UPLOAD;
const REACT_APP_PROD_BASE_URL        = process.env.REACT_APP_PROD_BASE_URL;
const REACT_APP_PROD_PDFJS_KEY       = process.env.REACT_APP_DEV_PDFJS_KEY;

const ValidarEntorno = (env) => {
  if (env === 'desarrollo') return true
  else if (env === 'produccion') return false
  else return null
}

// Configuracion Rasseto
export const EnvConstant = {
  REACT_APP_PATH_UPLOAD  : ValidarEntorno(process.env.REACT_APP_ENV)  ?  REACT_APP_DEV_PATH_UPLOAD  :  REACT_APP_PROD_PATH_UPLOAD,
  REACT_APP_BASE_URL     : ValidarEntorno(process.env.REACT_APP_ENV)  ?  REACT_APP_DEV_BASE_URL     :  REACT_APP_PROD_BASE_URL,
  REACT_APP_PDFJS_KEY    : ValidarEntorno(process.env.REACT_APP_ENV)  ?  REACT_APP_DEV_PDFJS_KEY    :  REACT_APP_PROD_PDFJS_KEY,
}
