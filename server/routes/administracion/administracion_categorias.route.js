const AdministracionCategorias = require("express").Router();
const AdministracionCategoriasController = require("../../controllers/administracion/administracion_categorias.controller");

AdministracionCategorias.post("/", AdministracionCategoriasController.index);
AdministracionCategorias.post("/new", AdministracionCategoriasController.store);
AdministracionCategorias.delete("/:id", AdministracionCategoriasController.del);

module.exports = AdministracionCategorias