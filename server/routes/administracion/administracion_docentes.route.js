const { Router } = require("express");
const router = Router();
const AdministracionDocentesController = require("../../controllers/administracion/administracion.docentes.controller")

router.post("/", AdministracionDocentesController.index)
router.post("/new", AdministracionDocentesController.store)

module.exports = router;