const router = require("express").Router();
const EstudianteBiblioteca = require("./estudiante_biblioteca.route");
const EstudianteCategoria = require("./estudiante_categoria.route");

router.use("/biblioteca", EstudianteBiblioteca)
router.use("/categoria", EstudianteCategoria)
module.exports = router