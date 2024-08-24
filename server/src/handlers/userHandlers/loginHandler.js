const { User } = require("../../db"); // Importa el modelo de usuario
const { loginUser } = require("../../controllers/userControllers/loginControllers");

const loginHandler = async (req, res) => {
  const { username, password } = req.body; // Datos del cuerpo de la solicitud

  try {
    // Buscar el usuario por nombre de usuario (o correo)
    const user = await User.findOne({ where: { username } });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({
        error: true,
        response: "Usuario no encontrado",
      });
    }

    // Utilizar el controlador loginUser para manejar la autenticación
    const result = await loginUser(user, password);

    if (result.error) {
      return res.status(400).json(result);
    }

    // Responder con los datos exitosos al frontend
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      response: "Error en el servidor",
    });
  }
};

module.exports = { loginHandler };
