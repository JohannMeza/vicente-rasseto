const { Router } = require("express");
const router = Router();
const SeguridadPerfilesMenuSubmenu = require("../../controllers/seguridad/seguridad_perfiles_menu_submenu.controller");

router.get("/perfiles_menu_submenu", SeguridadPerfilesMenuSubmenu.index)
router.get("/:id", SeguridadPerfilesMenuSubmenu.show)
router.post("/", SeguridadPerfilesMenuSubmenu.store)

module.exports = router