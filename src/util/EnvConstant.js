const RASSETO_DEVELOPMENT       = true;

// Desarrollo
const RASSETO_DEV_PATH_UPLOAD   = "assets/upload/";
const RASSETO_DEV_BASE_URL      = "http://localhost:4010/api"

// Produccion
const RASSETO_PROD_PATH_UPLOAD  = "media/";
const RASSETO_PROD_BASE_URL     = "https://vicente-rasseto.onrender.com/api";

// Configuracion Rasseto
export const EnvConstant = {
    RASSETO_PATH_UPLOAD  : RASSETO_DEVELOPMENT  ?  RASSETO_DEV_PATH_UPLOAD  :  RASSETO_PROD_PATH_UPLOAD,
    RASSETO_BASE_URL     : RASSETO_DEVELOPMENT  ?  RASSETO_DEV_BASE_URL     :  RASSETO_PROD_BASE_URL,
}
