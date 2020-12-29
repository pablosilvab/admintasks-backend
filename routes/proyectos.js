const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");

router.post("/", auth, proyectoController.crearProyecto);
router.get("/", auth, proyectoController.crearProyecto);

module.exports = router;
