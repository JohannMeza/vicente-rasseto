const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const seguridadPerfiles = new Schema({
  ID_CONFIGURACION_MENU: {
    type: [Schema.Types.ObjectId],
    ref: "ConfiguracionMenu"
  },
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
  },
  ESTADO: {
    type: Boolean,
    require: true,
  }
},{
  versionKey: false,
  timestamps: true
})
seguridadPerfiles.plugin(mongoosePaginate);
const SeguridadPerfiles = model("SeguridadPerfiles", seguridadPerfiles);
module.exports = SeguridadPerfiles;