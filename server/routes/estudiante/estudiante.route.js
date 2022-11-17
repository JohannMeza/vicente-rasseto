const router = require("express").Router();
const EstudianteBiblioteca = require("./estudiante_biblioteca.route");
router.use("/biblioteca", EstudianteBiblioteca)
module.exports = router