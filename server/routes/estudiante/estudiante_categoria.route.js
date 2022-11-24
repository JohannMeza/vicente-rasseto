const router = require("express").Router();
const EstudianteCategoriaController = require("../../controllers/estudiante/estudiante_categoria.controller");

router.post("/", EstudianteCategoriaController.search)

module.exports = router