const path = require('path');
const multer = require('multer');

const pathLocal = '../../src/assets/upload';
const pathServer = '../../build/static/media/upload';

const StorageMulter = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, pathServer)), // -- ../../public/upload
  filename: (req, file, cb) => cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
})

const StorageMulterExcel = multer.diskStorage({})

module.exports = {StorageMulter, StorageMulterExcel}