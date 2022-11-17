const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const seguridadUsuarios = new Schema({
  ID_LOGIN: {
    ref: "Login",
    type: Schema.Types.ObjectId,
    required: true,
  },
  ID_PERFILES: {
    ref: "SeguridadPerfiles",
    type: Schema.Types.ObjectId,
    required: true,
  },
  ID_SEGURIDAD_MENU: {
    ref: "SeguridadMenu",
    type: [Schema.Types.ObjectId],
  },
  NOMBRE_USUARIO: {
    type: String,
    trim: true,
    required: true,
  },
  DNI: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    max: 8,
    min: 8
  },
  ESTADO: {
    type: Boolean,
    required: true
  },
  ID_GRADO: {
    ref: "AdministracionGrado",
    type: Schema.Types.ObjectId,
  }
}, {
  versionKey: false,
  timestamps: true
})

// middleware pre 
// /^find/ reguex -> this.find(), this.findOne(), ...
// trae ya los datos
// seguridadUsuarios.pre(/^find/, function (next) {
//   this.populate({
//     path: 'ID_LOGIN',
//     select: 'ID_LOGIN EMAIL',
//   });
//   next();
// });

seguridadUsuarios.plugin(mongoosePaginate);
const SeguridadUsuarios = model("SeguridadUsuarios", seguridadUsuarios);
module.exports = SeguridadUsuarios;