/* eslint-disable no-throw-literal */
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * 
 * @param {res, res, next}
 * @returns Valida si el id de la schema es valido
 */

const verifyObjectId = (req, res, next) => {
  const { id } = req.params
  
  try {
    if(ObjectId.isValid(id)){
      if((String)(new ObjectId(id)) === id) {
        next()
      } else {
        throw({ 
          error: true,
          status: 403,
          statusText: "Id proveído no es válido"
        })
      }
    } else {
      throw({ 
        error: true,
        status: 403,
        statusText: "Id proveído no es válido"
      })
    }
  } catch (err) {
    return res.status(err.status || 500).json({ ...err })
  }
}

module.exports = verifyObjectId;