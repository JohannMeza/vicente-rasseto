const { Router } = require("express");
const router = Router();
const AdministracionAlumnosController = require("../../controllers/administracion/administracion.alumnos.controller")

router.post("/", AdministracionAlumnosController.index)
router.post("/new", AdministracionAlumnosController.store)
router.post("/grados_label", AdministracionAlumnosController.getGradosLabel)

module.exports = router;