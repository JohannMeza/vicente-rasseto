const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const configuracionSubmenuSchema = new Schema({
  PATH: {
    type: String,
    required: true,
    trim: true,
  },
  PATH_BASE: {
    type: String,
    trim: true,
    required: true
  },
  PATH_FILE: {
    type: String,
    trim: true,
    required: true
  },
  NOMBRE_ICON: {
    type: String,
    trim: true,
    required: true
  },
  NOMBRE_SUBMENU: {
    type: String,
    trim: true,
    required: true,
  },
  ESTADO: {
    type: Boolean,
    required: true
  },
  ORDEN: {
    type: Number,
    default: 0
  }
},{
  versionKey: false,
  timestamps: true,
  id: true
})

configuracionSubmenuSchema.plugin(mongoosePaginate);

const ConfiguracionSubmenu = model("ConfiguracionSubmenu", configuracionSubmenuSchema);
module.exports = ConfiguracionSubmenu;