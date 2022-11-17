const AdministracionPaginas = require("express").Router();
const AdministracionPaginasController = require("../../controllers/administracion/administracion_paginas.controller");
AdministracionPaginas.get("/", AdministracionPaginasController.index)
module.exports = AdministracionPaginas;