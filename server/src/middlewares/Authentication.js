// middlewares/authentication.js
const jwt = require("jsonwebtoken");
const { BlackListedTokens } = require("../db");
const secret = process.env.SECRET_KEY;

async function isAuthenticated(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Necesitas iniciar sesión para entrar aquí");
  }

  // Verificar si el token está en la lista negra
  const blacklistedToken = await BlackListedTokens.findOne({ where: { token } });

  if (blacklistedToken) {
    return res.status(401).send("Token inválido o expirado");
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido o expirado");
    }

    req.user = decoded;
    next();
  });
}

module.exports = { isAuthenticated };
