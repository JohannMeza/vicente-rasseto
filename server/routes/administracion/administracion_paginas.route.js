const { Router } = require("express")
const router = Router();
const indexController = require("../../controllers/administracion/administracion_paginas.controller");

router.get("/", indexController.index)

module.exports = router;