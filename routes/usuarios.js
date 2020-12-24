const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre").not().isEmpty().withMessage("El nombre es obligatorio"),
    check("email").isEmail().withMessage("Agrega un email valido"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("El password debe ser minimo de 6 caracteres"),
  ],
  usuarioController.crearUsuario
);

module.exports = router;
