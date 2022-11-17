const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const AdministracionMultimediaSchema = new Schema({
  ID_AUTOR: {
    ref: "AdministracionAutores",
    type: [Schema.Types.ObjectId],
    required: true
  },
  ID_CATEGORIA: {
    ref: "AdministracionCategorias",
    type: [Schema.Types.ObjectId],
    required: true
  },
  ID_ETIQUETA: {
    ref: "AdministracionEtiquetas",
    type: [Schema.Types.ObjectId],
    required: true
  },
  ID_GRADO: {
    ref: "AdministracionGrado",
    type: Schema.Types.ObjectId,
    required: true
  },
  TITULO: {
    type: String,
    required: true,
    trim: true
  },
  TIPO: {
    type: String,
    required: true,
    trim: true
  },
  LINK: {
    type: String,
    trim: true
  },
  FILE: {
    type: Object,
  },
  IMAGEN: {
    type: Object,
  },
  ESTADO: {
    type: String,
  }
}, {
  versionKey: false,
  timestamps: true
})

AdministracionMultimediaSchema.plugin(mongoosePaginate);
const AdministracionMultimedia = model("AdministracionMultimedia", AdministracionMultimediaSchema);
module.exports = AdministracionMultimedia;