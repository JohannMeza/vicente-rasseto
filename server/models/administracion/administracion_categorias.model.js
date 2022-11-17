const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const AdministracionCategoriasSchema = new Schema({
  CATEGORIA: {
    type: String,
    trim: true,
    required: true
  },
  ESTADO: {
    type: Boolean,
    trim: true,
    required: true
  }
},{
  versionKey: false,
  timestamps: true
})

AdministracionCategoriasSchema.plugin(mongoosePaginate);
const AdministracionCategorias = model("AdministracionCategorias", AdministracionCategoriasSchema);
module.exports = AdministracionCategorias;