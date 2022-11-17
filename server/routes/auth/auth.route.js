const express = require("express");
const AuthRoute = express();
const AuthUsuario = require("./auth_usuario.route");

AuthRoute.use("/usuario", AuthUsuario)

module.exports = AuthRoute