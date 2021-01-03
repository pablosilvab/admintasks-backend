const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array(),
    });
  }

  try {
    const { proyecto } = req.body;
    const proyectoDB = await Proyecto.findById(proyecto);
    if (!proyectoDB) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }
    if (proyectoDB.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "Usuario no autorizado" });
    }

    const tarea = new Tarea(req.body);

    await tarea.save();
    res.status(201).json({
      msg: "Tarea ingresada correctamente",
      data: tarea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.query;
    const proyectoDB = await Proyecto.findById(proyecto);
    if (!proyectoDB) {
      return res.status(404).json({ msg: "Proyecto no existe" });
    }
    if (proyectoDB.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "Usuario no autorizado" });
    }

    const tareas = await Tarea.find({ proyecto }).sort({
      fechaCreacion: -1,
    });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;
    const tareaDB = await Tarea.findById(req.params.id);
    if (!tareaDB) {
      return res.status(404).json({ msg: "Tarea no existe" });
    }
    const proyectoDB = await Proyecto.findById(proyecto);
    if (proyectoDB.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "Usuario no autorizado" });
    }

    const nuevaTarea = {};
    if (nombre) nuevaTarea.nombre = nombre;
    if (estado) nuevaTarea.estado = estado;

    const tarea = await Tarea.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevaTarea },
      { new: true }
    );

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.body;
    const tareaDB = await Tarea.findById(req.params.id);
    if (!tareaDB) {
      return res.status(404).json({ msg: "Tarea no existe" });
    }
    const proyectoDB = await Proyecto.findById(proyecto);
    if (proyectoDB.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "Usuario no autorizado" });
    }

    await Tarea.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
