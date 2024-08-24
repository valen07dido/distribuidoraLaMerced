const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

function isAuthenticated(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Necesitas iniciar sesión para entrar aquí");
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
