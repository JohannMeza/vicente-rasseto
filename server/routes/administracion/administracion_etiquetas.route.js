const AdministracionEtiquetas = require("express").Router();
const AdministracionEiquetas = require("../../controllers/administracion/administracion_etiquetas.controller")

AdministracionEtiquetas.post("/", AdministracionEiquetas.index);
AdministracionEtiquetas.post("/new", AdministracionEiquetas.store);
AdministracionEtiquetas.delete("/:id", AdministracionEiquetas.del);

module.exports = AdministracionEtiquetas