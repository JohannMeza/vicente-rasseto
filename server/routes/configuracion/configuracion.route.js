const express = require("express");
const ConfiguracionRoute = express();
const ConfiguracionMenu = require("./configuracion_menu.route");
const ConfiguracionSubmenu = require("./configuracion_submenu.route");

ConfiguracionRoute.use("/menu", ConfiguracionMenu);
ConfiguracionRoute.use("/submenu", ConfiguracionSubmenu);

module.exports = ConfiguracionRoute;