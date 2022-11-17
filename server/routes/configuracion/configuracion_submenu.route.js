const router = require("express").Router();
const ConfiguracionSubmenu = require("../../controllers/configuracion/configuracion_submenu.controller");

router.post("/", ConfiguracionSubmenu.index);
router.post("/new", ConfiguracionSubmenu.store);
router.delete("/:id", ConfiguracionSubmenu.del);
router.post("/multi_search", ConfiguracionSubmenu.searchByIds)

module.exports = router