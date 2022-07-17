const express = require("express");
const app = express();
const config = require("./config/config");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// ### ROUTES ###
// AUTH
const Auth = require("./routes/auth/auth.route");
// ADMIN
const AdminAdministracion = require("./routes/administracion/administracion_paginas.route");

// SEGURIDAD
const Seguridad = require("./routes/seguridad/seguridad.route");
const SeguridadPerfiles = require("./routes/seguridad/seguridad_perfiles.route")
const SeguridadPerfilesMenuSubmenu = require("./routes/seguridad/seguridad_perfiles_menu_submenu.route")

// CONFIGURACION
const ConfiguracionMenu = require("./routes/configuracion/configuracion_menu.route")


// ### CONFIG ###
app.set("PORT", config.database.PORT || 4000);
app.use(cors());
app.use(express.static(path.join(__dirname, "../build")));
app.use(express.json());
app.use(morgan("dev"));

// ### MIDDLEWARE ###


// ### ROUTES ###

app.use("/api", AdminAdministracion)
app.use("/api", Auth)
app.use("/api/seguridad", Seguridad)
app.use("/api/seguridad/perfiles", SeguridadPerfiles)
app.use("/api/seguridad/perfiles_menu_submenu", SeguridadPerfilesMenuSubmenu)
app.use("/api/configuracion", ConfiguracionMenu)


module.exports = app;