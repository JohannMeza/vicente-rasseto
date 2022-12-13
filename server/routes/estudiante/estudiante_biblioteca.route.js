const router = require("express").Router();
const EstudianteBibliotecaController = require("../../controllers/estudiante/estudiante_biblioteca.controller")
router.get("/", EstudianteBibliotecaController.index)
router.get("/libro/:id", EstudianteBibliotecaController.show)
router.get("/libro/preview/:id", EstudianteBibliotecaController.previewLibro)
router.post("/libros-relacionados", EstudianteBibliotecaController.showLibrosRelacionados)
router.post("/multimedia", EstudianteBibliotecaController.search)
module.exports = router