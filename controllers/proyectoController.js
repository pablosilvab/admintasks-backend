const Proyecto = require("../models/Proyecto");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearProyecto = async (req, res) => {
  try {
    const proyecto = new Proyecto(req.body);

    // jwt
    proyecto.creador = req.usuario.id

    proyecto.save();
    res.status(201).json({
      msg: "Proyecto ingresado correctamente",
      data: proyecto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
