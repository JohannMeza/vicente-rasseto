const { Schema, model } = require("mongoose");

const seguridadPerfiles = new Schema({
  NOMBRE_PERFIL: {
    type: String,
    required: true,
    trim: true
  },
  IS_MANAGEABLE: {
    type: Boolean,
    require: false,
    trim: true,
    default: true
  }
},{
  versionKey: false,
  timestamps: true
})

const SeguridadPerfiles = model("SeguridadPerfiles", seguridadPerfiles);
module.exports = SeguridadPerfiles;