const { Router } = require("express");
const router = Router();

const SeguridadPerfiles = require("../../controllers/seguridad/seguridad_perfiles.controller");

router.get("/perfiles", SeguridadPerfiles.index);
router.get("/:id", SeguridadPerfiles.show);

module.exports = router;