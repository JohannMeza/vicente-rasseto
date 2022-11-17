const express = require("express")
const AdministracionRoute = express();
const AdministracionPaginas = require("./administracion_paginas.route");
const AdministracionNivelEstudio = require("./administracion_nivel_estudio.route");
const AdministracionGrado = require("./administracion_grados.route");
const AdministracionCategorias = require("./administracion_categorias.route");
const AdministracionAutor = require("./administracion_autores.route");
const AdministracionEtiquetas = require("./administracion_etiquetas.route");
const AdministracionMultimedia = require("./administracion_multimedia.route");
const AdministracionAlumnos = require("./administracion_alumnos.route");
const AdministracionDocentes = require("./administracion_docentes.route");

AdministracionRoute.use("/paginas", AdministracionPaginas);
AdministracionRoute.use("/nivel_estudio", AdministracionNivelEstudio);
AdministracionRoute.use("/grado", AdministracionGrado);
AdministracionRoute.use("/categorias", AdministracionCategorias);
AdministracionRoute.use("/autor", AdministracionAutor);
AdministracionRoute.use("/etiquetas", AdministracionEtiquetas);
AdministracionRoute.use("/multimedia", AdministracionMultimedia);
AdministracionRoute.use("/alumnos", AdministracionAlumnos);
AdministracionRoute.use("/docentes", AdministracionDocentes);

module.exports = AdministracionRoute;