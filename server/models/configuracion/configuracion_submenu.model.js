const { Schema, model } = require("mongoose");

const configuracionSubmenuSchema = new Schema({
  ID_MENU: {
    ref: "SeguridadMenu",
    type: Schema.Types.ObjectId,
    trim: true
  },
  PATH: {
    type: String,
    required: true,
    trim: true,
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
  }
},{
  versionKey: false,
  timestamps: true
})

const ConfiguracionSubmenu = model("ConfiguracionSubmenu", configuracionSubmenuSchema);
module.exports = ConfiguracionSubmenu;