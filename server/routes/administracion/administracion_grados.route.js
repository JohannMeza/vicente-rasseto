const { Router } = require("express")
const router = Router();
const AdministracionGrado = require("../../controllers/administracion/administracion_grados.controller");

router.post("/:id", AdministracionGrado.index)
router.post("/new/:id", AdministracionGrado.store)
router.put("/delete/:id", AdministracionGrado.del)

module.exports = router;