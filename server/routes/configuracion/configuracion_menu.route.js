const { Router } = require("express");
const router = Router();
const ConfiguracionMenu = require("../../controllers/configuracion/configuracion_menu.controller");

const IndexMiddleware = require("../../middleware/index.middleware")

router.post("/", ConfiguracionMenu.index)
router.post("/new", ConfiguracionMenu.store)
router.get("/show/:id", [IndexMiddleware.verifyObjectId], ConfiguracionMenu.show)
router.post("/subpaginas/:id", [IndexMiddleware.verifyObjectId], ConfiguracionMenu.searchSubpaginas)
router.delete("/:id", ConfiguracionMenu.remove)
router.put("/update/submenus/:id", ConfiguracionMenu.updateSubmenus)

module.exports = router;