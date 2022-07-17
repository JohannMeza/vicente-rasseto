const { Schema, model } = require("mongoose");

const SeguridadPerfilesMenuSubmenuSchema = new Schema({
  ID_SEGURIDAD_PERFILES: {
    ref: "SeguridadPerfiles",
    type: Schema.Types.ObjectId,
    required: true
  },
  ID_CONFIGURACION_MENU: {
    ref: "ConfiguracionMenu",
    type: Schema.Types.ObjectId,
    required: true
  },
  ID_CONFIGURACION_SUBMENU: {
    ref: "ConfiguracionSubmenu",
    type: [Schema.Types.ObjectId],
    required: true
  },
}, {
  versionKey: false,
  timestamps: true
})

const SeguridadPerfilesMenuSubmenu = model("SeguridadPerfilesMenuSubmenu", SeguridadPerfilesMenuSubmenuSchema);

module.exports = SeguridadPerfilesMenuSubmenu 