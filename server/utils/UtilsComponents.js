const ObjectId = require('mongoose').Types.ObjectId;

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

const ValidarObjectForFilter = (obj) => {
  let dataFilter = { $and: [] };
  
  for (let value in obj) {
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

module.exports = {
  ValidarParametrosObligatorios,
  ValidarObjectIdValido,
  ValidarObjectForFilter,
  CambiarNombreCampos
}