const { Router } = require("express");
const router = Router();

const SeguridadPerfiles = require("../../controllers/seguridad/seguridad_perfiles.controller");

router.post("/", SeguridadPerfiles.index);
router.post("/new", SeguridadPerfiles.store)
router.get("/:id", SeguridadPerfiles.show);

module.exports = router;