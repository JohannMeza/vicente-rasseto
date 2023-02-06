const path = require('path');
const multer = require('multer');
const EnvConstant = require('./EnvConstant');

const StorageMulter = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, EnvConstant.APP_PATH_UPLOAD)),
  filename: (req, file, cb) => cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
})

const StorageMulterTemp = multer.diskStorage({})
const StorageMulterExcel = multer.diskStorage({})
const StorageMulterCloudinary = multer.diskStorage({ filename: (req, file, cb) => cb(null, `${file.originalname}`) })

module.exports = {StorageMulter, StorageMulterTemp, StorageMulterExcel, StorageMulterCloudinary}