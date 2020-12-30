const Proyecto = require("../models/Proyecto");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearProyecto = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array(),
    });
  }

  try {
    const proyecto = new Proyecto(req.body);

    // jwt
    proyecto.creador = req.usuario.id;

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

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      fechaCreacion: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarProyecto = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array(),
    });
  }

  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "Usuario no autorizado" });
    }
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {
    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "Usuario no autorizado" });
    }

    await Proyecto.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
