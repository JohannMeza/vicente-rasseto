const REACT_APP_ENV                = "desarrollo"
// Desarrollo
const REACT_APP_DEV_PATH_UPLOAD    = "assets/upload/";
const REACT_APP_DEV_BASE_URL       = "http://localhost:4010/api";
const REACT_APP_DEV_PDFJS_KEY      = "VMeLR5MsW5lX3X9YfqQF";

// Produccion
const REACT_APP_PROD_PATH_UPLOAD     = "media/";
const REACT_APP_PROD_BASE_URL        = "https://vicente-rasseto.onrender.com/api";
const REACT_APP_PROD_PDFJS_KEY       = "kkqDT5sOiphvYoV6XnVS";

const ValidarEntorno = (env) => {
  if (env === 'desarrollo') return true
  else if (env === 'produccion') return false
  else return null
}

// Configuracion Rasseto
export const EnvConstant = {
  REACT_APP_PATH_UPLOAD  : ValidarEntorno(REACT_APP_ENV)  ?  REACT_APP_DEV_PATH_UPLOAD  :  REACT_APP_PROD_PATH_UPLOAD,
  REACT_APP_BASE_URL     : ValidarEntorno(REACT_APP_ENV)  ?  REACT_APP_DEV_BASE_URL     :  REACT_APP_PROD_BASE_URL,
  REACT_APP_PDFJS_KEY    : ValidarEntorno(REACT_APP_ENV)  ?  REACT_APP_DEV_PDFJS_KEY    :  REACT_APP_PROD_PDFJS_KEY,
}
