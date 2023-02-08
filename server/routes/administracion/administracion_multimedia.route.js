const AdministracionMultimedia = require("express").Router();
const AdministracionMultimediaController = require("../../controllers/administracion/administracion_multimedia.controller");
const UtilsComponents = require("../../utils/UtilsComponents");

AdministracionMultimedia.post("/", AdministracionMultimediaController.index);

AdministracionMultimedia.post("/new/cloudinary", UtilsComponents.cloudinary.single('FILE_PATH'), AdministracionMultimediaController.store);
AdministracionMultimedia.post("/new/github", UtilsComponents.uploadFileTemp.single('FILE_PATH'), AdministracionMultimediaController.store);

AdministracionMultimedia.delete("/delete/:id", AdministracionMultimediaController.del);
AdministracionMultimedia.post("/list_data_initial", AdministracionMultimediaController.listDataInitial);
AdministracionMultimedia.get("/list_grados/:id", AdministracionMultimediaController.listGrados);
AdministracionMultimedia.post("/upload-image", UtilsComponents.uploadImage.single('FILE_PATH'), AdministracionMultimediaController.uploadImage);

// Pagina de Configuracion de Grados
AdministracionMultimedia.post("/list_nivel_estudio", AdministracionMultimediaController.findNivelEstudio);
AdministracionMultimedia.post("/update_grados/:id", AdministracionMultimediaController.updateGradosByLibros);
AdministracionMultimedia.post("/list_grados_by_media/:id", AdministracionMultimediaController.listGradosByLibro);


module.exports = AdministracionMultimedia