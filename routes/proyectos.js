const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const proyectoController = require("../controllers/proyectoController");

router.post("/", proyectoController.crearProyecto);

module.exports = router;
