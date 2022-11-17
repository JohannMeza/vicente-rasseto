const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const AdministracionEtiquetasSchema = new Schema({
  ETIQUETA: {
    type: String,
    trim: true,
    required: true
  },
  DESCRIPCION: {
    type: String,
    trim: true
  },
  ESTADO: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

AdministracionEtiquetasSchema.plugin(mongoosePaginate);
const AdministracionEtiquetas = model("AdministracionEtiquetas", AdministracionEtiquetasSchema);
module.exports = AdministracionEtiquetas;
