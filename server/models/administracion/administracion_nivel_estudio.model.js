const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const NivelEstudioSchema = new Schema({
  NIVEL_ESTUDIO: {
    type: String,
    required: true,
    trim: true,
  },
  DESCRIPCION: {
    type: String,
    trim: true,
  },
  ESTADO: {
    type: Boolean,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

NivelEstudioSchema.plugin(mongoosePaginate);
const NivelEstudio = model("AdmnistracionNivelEstudio", NivelEstudioSchema);
module.exports = NivelEstudio;