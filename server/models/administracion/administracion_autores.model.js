const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const AdministracionAutoresSchema = new Schema({
  NOMBRE_AUTOR: {
    type: String,
    required: true,
    trim: true
  },
  LINK: {
    type: String,
    trim: true
  },
  ESTADO: {
    type: Boolean,
    default: true,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

AdministracionAutoresSchema.plugin(mongoosePaginate);
const AdministracionAutores = model("AdministracionAutores", AdministracionAutoresSchema);
module.exports = AdministracionAutores;