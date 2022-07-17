const { Schema, model } = require("mongoose");

const seguridadUsuarios = new Schema({
  ID_LOGIN: {
    ref: "Login",
    type: Schema.Types.ObjectId,
    required: true,
  },
  ID_PERFILES: {
    ref: "SeguridadPerfiles",
    type: Schema.Types.ObjectId,
    required: true,
  },
  ID_SEGURIDAD_MENU: {
    ref: "SeguridadMenu",
    type: [Schema.Types.ObjectId],
    required: true,
  },
  NOMBRE_USUARIO: {
    type: String,
    trim: true,
    required: true,
  }
}, {
  versionKey: false,
  timestamps: true
})

const SeguridadUsuarios = model("SeguridadUsuarios", seguridadUsuarios);
module.exports = SeguridadUsuarios;