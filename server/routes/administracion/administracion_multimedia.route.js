const AdministracionMultimedia = require("express").Router();
const AdministracionMultimediaController = require("../../controllers/administracion/administracion_multimedia.controller")
AdministracionMultimedia.post("/", AdministracionMultimediaController.index);
AdministracionMultimedia.post("/new", AdministracionMultimediaController.store);
AdministracionMultimedia.delete("/delete/:id", AdministracionMultimediaController.del);
AdministracionMultimedia.post("/list_data_initial", AdministracionMultimediaController.listDataInitial);
AdministracionMultimedia.get("/list_grados/:id", AdministracionMultimediaController.listGrados);
module.exports = AdministracionMultimedia