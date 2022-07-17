const { Schema, model } = require("mongoose");
const ConfiguracionSubmenu = require("./configuracion_submenu.model");
const mongoosePaginate = require('mongoose-paginate-v2');

const configuracionMenuSchema = new Schema({
  NOMBRE_MENU: {
    type: String,
    trim: true,
    required: true
  },
  NOMBRE_ICON: {
    type: String,
    trim: true,
    required: true
  },
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