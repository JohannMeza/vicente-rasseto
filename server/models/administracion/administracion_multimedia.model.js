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
    type: [Schema.Types.ObjectId],
    required: true
  },
  TITULO: {
    type: String,
    required: true,
    trim: true
  },
  SUBIDA: {
    type: String,
    required: true,
    trim: true
  },
  DESCRIPCION_LARGA: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  DESCRIPCION_CORTA: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
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
    type: String,
  },
  IMAGEN: {
    type: Object,
  },
  ESTADO: {
    type: String,
  },
  NOMBRE_FILE: {
    type: String,
    trim: true
  },
  PAGINAS: {
    type: String,
    trim: true
  },
  PESO: {
    type: String,
    trim: true
  },
  BACKGROUND: {
    type: String,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
})

AdministracionMultimediaSchema.plugin(mongoosePaginate);
const AdministracionMultimedia = model("AdministracionMultimedia", AdministracionMultimediaSchema);
module.exports = AdministracionMultimedia;