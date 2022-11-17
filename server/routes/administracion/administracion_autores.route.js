const AdministracionAutor = require("express").Router();
const AdministracionAutorController = require("../../controllers/administracion/administracion_autores.controller")

AdministracionAutor.post("/", AdministracionAutorController.index);
AdministracionAutor.post("/new", AdministracionAutorController.store);
AdministracionAutor.delete("/:id", AdministracionAutorController.del);

module.exports = AdministracionAutor