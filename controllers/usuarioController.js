const Usuario = require("../models/Usuario");

exports.crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      res.status(400).json({
        msg: "El usuario ya existe",
      });
    }
    usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json({
      msg: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Hubo un error",
    });
  }
};
