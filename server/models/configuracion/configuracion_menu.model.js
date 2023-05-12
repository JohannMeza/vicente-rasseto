const { Schema, model } = require("mongoose");
const ConfiguracionSubmenu = require("./configuracion_submenu.model");
const mongoosePaginate = require('mongoose-paginate-v2');

const configuracionMenuSchema = new Schema({
  ID_CONFIGURACION_SUBMENU: {
    type: [Schema.Types.ObjectId],
    ref: "ConfiguracionSubmenu"
  },
  NOMBRE_MENU: {
    type: String,
    trim: true,
    required: true
  },
  PATH: {
    type: String,
    trim: true,
    required: true
  },
  NOMBRE_ICON: {
    type: String,
    trim: true,
    required: true
  },
  ESTADO: {
    type: Boolean,
    required: true
  },
  ORDEN: {
    type: Number,
    default: 0,
  }
},{
  versionKey: false,
  timestamps: true
})

configuracionMenuSchema.plugin(mongoosePaginate);

configuracionMenuSchema.pre('remove',  function(next) {
  ConfiguracionSubmenu.remove({ ID_MENU: { $in: this._id }  }).exec();
  next();
});

const ConfiguracionMenu = model("ConfiguracionMenu", configuracionMenuSchema);
module.exports = ConfiguracionMenu;