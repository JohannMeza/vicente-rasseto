const path = require('path');
const multer = require('multer');
const EnvConstant = require('./EnvConstant');

/**
 * 
 * @param {Object} obj 
 * @returns Realiza subida de archivos al servidor
 */

const StorageMulter = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, EnvConstant.APP_PATH_UPLOAD)),
  filename: (req, file, cb) => cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
})

/**
 * 
 * @param {Object} obj 
 * @returns Realiza subida a los archivos Temp del sistema
 */

const StorageMulterTemp = multer.diskStorage({})

/**
 * 
 * @param {Object} obj 
 * @returns Realiza subida de archivo excel a los archivos Temp del sistema 
 */

const StorageMulterExcel = multer.diskStorage({})

/**
 * 
 * @param {Object} obj 
 * @returns Realiza subida de archivo y cambia el nombre del archivo al archivo subido
 */

const StorageMulterCloudinary = multer.diskStorage({ filename: (req, file, cb) => cb(null, `${file.originalname}`) })

module.exports = {StorageMulter, StorageMulterTemp, StorageMulterExcel, StorageMulterCloudinary}