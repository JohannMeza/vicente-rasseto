// const { Router } = require("express");
// const router = Router();

// const SeguridadPerfiles = require("../../controllers/seguridad/seguridad_perfiles.controller");

// router.get("/perfiles", SeguridadPerfiles.index)
// router.post("/perfiles", SeguridadPerfiles.store)
// // router.put("/perfiles/:id", SeguridadPerfiles.store)
// // router.delete("/perfiles/:id", SeguridadPerfiles.delete)

// module.exports = router;

const express = require("express");
const SeguridadRoute = express();
const SeguridadPerfilesMenuSubmenu = require("./seguridad_perfiles_menu_submenu.route");
const SeguridadPerfiles = require("./seguridad_perfiles.route")
const SeguridaUsuarios = require("./seguridad_usuarios.route")

SeguridadRoute.use("/perfiles_menu", SeguridadPerfilesMenuSubmenu)
SeguridadRoute.use("/perfiles", SeguridadPerfiles)
SeguridadRoute.use("/usuarios", SeguridaUsuarios)

module.exports = SeguridadRoute