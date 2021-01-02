const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");


router.post(
  "/",
  [
    check("email").isEmail().withMessage("Agrega un email valido"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("El password debe ser minimo de 6 caracteres"),
  ],
  authController.autenticarUsuario
);

router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;
