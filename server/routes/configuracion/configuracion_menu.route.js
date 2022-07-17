const { Router } = require("express");
const router = Router();
const ConfiguracionMenu = require("../../controllers/configuracion/configuracion_menu.controller");

const IndexMiddleware = require("../../middleware/index.middleware")


router.post("/", ConfiguracionMenu.index)
router.post("/new", ConfiguracionMenu.store)
router.get("/show/:id", [IndexMiddleware.verifyObjectId], ConfiguracionMenu.show)
router.delete("/:id", ConfiguracionMenu.remove)

module.exports = router;