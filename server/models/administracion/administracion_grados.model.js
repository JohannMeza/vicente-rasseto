const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const AdministracionGrados = new Schema({
  ID_NIVEL_ESTUDIO: {
    type: Schema.Types.ObjectId,
    ref: "AdmnistracionNivelEstudio",
    required: true
  },
  GRADO: {
    type: String,
    required: true,
    trim: true
  },
  ESTADO: {
    type: Boolean,
    required: true
  }
},{
  versionKey: false,
  timestamps: true
})

AdministracionGrados.plugin(mongoosePaginate);
const AdministracionGrado = model("AdministracionGrado", AdministracionGrados);

module.exports = AdministracionGrado