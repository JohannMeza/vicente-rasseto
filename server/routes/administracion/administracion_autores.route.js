const AdministracionAutor = require("express").Router();
const AdministracionAutorController = require("../../controllers/administracion/administracion_autores.controller")
const UtilsComponents = require("../../utils/UtilsComponents");

AdministracionAutor.post("/", AdministracionAutorController.index);
AdministracionAutor.post("/new", AdministracionAutorController.store);
AdministracionAutor.delete("/:id", AdministracionAutorController.del);
AdministracionAutor.post("/importar", UtilsComponents.importarExcel.single('FILE_PATH'), AdministracionAutorController.importarExcel);

module.exports = AdministracionAutor