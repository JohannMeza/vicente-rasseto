const { Schema, model } = require("mongoose");

const administracionSchema = new Schema ({
  
}, {
  versionKey: false,
  timestamps: true
})

const Administracion = model("Administracion", administracionSchema)
module.exports = Administracion;