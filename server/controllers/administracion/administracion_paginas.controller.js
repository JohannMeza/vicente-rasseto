const Administracion = require("../../models/administracion/administracion.model");

const index = async (req, res) => {
  const listAdmin = await Administracion.find();
  res.send("Administracion de la paginas")
}

const store = async () => {
  try {
    
  } catch (error) {
    
  }
}

module.exports = {
  index
}