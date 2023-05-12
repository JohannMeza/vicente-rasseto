const express = require("express");
const app = express();
const config = require("./config/config");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const bodyParser  = require("body-parser")

// ### ROUTES ###
const AuthRoute = require("./routes/auth/auth.route"); // AUTH
const AdministracionRoute = require("./routes/administracion/administracion.route");  // ADMINISTRACION
const SeguridadRoute = require("./routes/seguridad/seguridad.route");                 // SEGURIDAD
const ConfiguracionRoute = require("./routes/configuracion/configuracion.route")      // CONFIGURACION
const EstudianteRoute = require("./routes/estudiante/estudiante.route")               // ESTUDIANTE

// ### CONFIG ###
app.set("PORT", config.database.PORT || 4000);
app.use(cors());
app.use(express.static(path.join(__dirname, "../")));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  extended: true,
  limit: "500mb"
}));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.raw({ limit: "500mb" }));
// ### MIDDLEWARE ###


// ### ROUTES ###
app.use("/api/administracion", AdministracionRoute)   // ADMINISTRACION
app.use("/api/configuracion", ConfiguracionRoute)     // CONFIGURACION
app.use("/api/seguridad", SeguridadRoute)             // SEGURIDAD
app.use("/api/auth", AuthRoute)                       // AUTENTIFICACION
app.use("/api/estudiante", EstudianteRoute)           // AUTENTIFICACION

module.exports = app;