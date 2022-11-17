const { Router } = require("express");
const router = Router();
const SeguridadUsuarios = require("../../models/seguridad/seguridad_usuarios.model");

router.get("/", async (req, res) => {
  const users = await SeguridadUsuarios.find();
  res.status(201).json({ message: users });
})

module.exports = router