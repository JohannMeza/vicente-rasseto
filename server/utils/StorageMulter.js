const path = require('path');
const multer = require('multer');

const StorageMulter = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../src/assets/upload')), // -- ../../public/upload
  filename: (req, file, cb) => cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
})

const StorageMulterExcel = multer.diskStorage({})

module.exports = {StorageMulter, StorageMulterExcel}