const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Usuario no autorizado." });
  }

  try {
      const cifrado = jwt.verify(token, process.env.SECRET)
      req.usuario = cifrado.usuario
      next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
