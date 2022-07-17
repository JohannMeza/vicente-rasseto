const { Router } = require("express");
const router = Router();

const SeguridadPerfiles = require("../../controllers/seguridad/seguridad_perfiles.controller");

router.get("/perfiles", SeguridadPerfiles.index)
router.post("/perfiles", SeguridadPerfiles.store)
// router.put("/perfiles/:id", SeguridadPerfiles.store)
// router.delete("/perfiles/:id", SeguridadPerfiles.delete)

module.exports = router;