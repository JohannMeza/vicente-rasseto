const { Router } = require("express");
const AdministracionNivelEstudio = require("../../controllers/administracion/administracion_nivel_estudio.controller");
const router = Router();

router.post("/", AdministracionNivelEstudio.index);
router.post("/new", AdministracionNivelEstudio.store);

module.exports = router;