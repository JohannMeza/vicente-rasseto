const ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');
const {StorageMulter, StorageMulterExcel, StorageMulterCloudinary, StorageMulterTemp} = require('./StorageMulter.js');

/**
 * 
 * @param {Object} Env 
 * @returns Valida ambiente actual
 */

const ValidarEntorno = (env) => {
  if (env === 'desarrollo') return true
  else if (env === 'produccion') return false
  else return null
}

/**
 * 
 * @param {Object} obj 
 * @returns Retorna false si lo la validacion es correcta de lo contrario devuelve la propiedad no valida
 */

const ValidarParametrosObligatorios = (obj = {}) => {
  for (let data in obj) {
    if (obj[data] === null || obj[data] === undefined || obj[data] === '') {
      return {
        error: true,
        status: 404,
        statusText: `El parametro ${data} es obligatorio`
      }
    }
  }

  return false
}

/**
 * 
 * @param {Object} obj 
 * @returns Valida si el id de la schema es valido
 */

const ValidarObjectIdValido = (id) => {
  if(ObjectId.isValid(id)){
    if((String)(new ObjectId(id)) === id) {
      return false
    } else {
      return { 
        error: true,
        status: 403,
        statusText: "Id proveído no es válido"
      }
    }
  } else {
    return { 
      error: true,
      status: 403,
      statusText: "Id proveído no es válido"
    }
  }
}

/**
 * 
 * @param {Object} obj 
 * @returns Valida si los campos estas incompletos
 */

const ValidarObjectForFilter = (obj) => {
  let dataFilter = { $and: [] };
  
  for (let value in obj) {
    if (value === "ESTADO" && obj[value] === 0) return;
    
    if (typeof obj[value] !== "boolean") { // VALOR NULL
      let elementObj = {
        $regex: (obj[value] === null || obj[value] === undefined) ? '' : obj[value], 
        $options: 'i'
      }

      dataFilter.$and = [
        ...dataFilter.$and,
        {[value]: elementObj}
      ]
    } else { // VALand BOOLEAN
      let elementObj = {
        $eq: (obj[value] === null || obj[value] === undefined) ? '' : obj[value], 
      }
      dataFilter.$and = [
        ...dataFilter.$and,
        {[value]: elementObj}
      ]
    }
  }

  return dataFilter
}

/**
 * 
 * @param {Object} obj 
 * @returns Cambia los campos de la data obtenida por el obj que se inserta
 */

const CambiarNombreCampos = (arrData, objCampos) => {
  let newArrData = [];
  arrData.forEach(data => {
    let objData = { ...data._doc }
    
    for(let value in objCampos) {
      if (objData[value]) {
        objData = {
          ...objData,
          [objCampos[value]]: objData[value]
        }
  
        delete objData[value];
      }
    }

    newArrData.push(objData)
  })

  return newArrData
}

const uploadFileTemp = multer({ storage: StorageMulterTemp, limits: {fieldSize: 25 * 1024 * 1024} })
const uploadImage = multer({ storage: StorageMulter, limits: {fieldSize: 25 * 1024 * 1024} })
const importarExcel = multer({ storage: StorageMulterExcel, limits: {fieldSize: 25 * 1024 * 1024} })
const cloudinary = multer({ storage: StorageMulterCloudinary, limits: {fieldSize: 25 * 1024 * 1024} })

module.exports = {
  ValidarEntorno,
  ValidarParametrosObligatorios,
  ValidarObjectIdValido,
  ValidarObjectForFilter,
  CambiarNombreCampos,
  uploadImage,
  importarExcel,
  cloudinary,
  uploadFileTemp
}