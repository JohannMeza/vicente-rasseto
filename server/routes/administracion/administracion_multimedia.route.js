const AdministracionMultimedia = require("express").Router();
const AdministracionMultimediaController = require("../../controllers/administracion/administracion_multimedia.controller");
const UtilsComponents = require("../../utils/UtilsComponents");

AdministracionMultimedia.post("/", AdministracionMultimediaController.index);

// Subida de Libro
AdministracionMultimedia.post("/new", AdministracionMultimediaController.store_new);
AdministracionMultimedia.post("/new/cloudinary", UtilsComponents.cloudinary.single('FILE_PATH'), AdministracionMultimediaController.store_upload);

AdministracionMultimedia.delete("/delete/:id", AdministracionMultimediaController.del);
AdministracionMultimedia.post("/list_data_initial", AdministracionMultimediaController.listDataInitial);
AdministracionMultimedia.get("/list_grados/:id", AdministracionMultimediaController.listGrados);
AdministracionMultimedia.post("/upload-image", UtilsComponents.uploadImage.single('FILE_PATH'), AdministracionMultimediaController.uploadImage);
AdministracionMultimedia.post("/importar", UtilsComponents.importarExcel.single('FILE_PATH'), AdministracionMultimediaController.importarExcel);

// Pagina de Configuracion de Grados
AdministracionMultimedia.post("/list_nivel_estudio", AdministracionMultimediaController.findNivelEstudio);
AdministracionMultimedia.post("/update_grados/:id", AdministracionMultimediaController.updateGradosByLibros);
AdministracionMultimedia.post("/list_grados_by_media/:id", AdministracionMultimediaController.listGradosByLibro);


module.exports = AdministracionMultimedia