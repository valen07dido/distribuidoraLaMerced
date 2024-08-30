// controllers/userControllers/loginControllers.js
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, UserCredentials, UserRole } = require("../../db");

const secret = process.env.SECRET_KEY; // Clave secreta para el token

const loginUser = async (username, password) => {
  try {
    // Verificar si las credenciales del usuario existen
    const userCredentials = await UserCredentials.findOne({ where: { username } });
    
    if (!userCredentials) {
      return {
        error: true,
        response: "El usuario no existe",
      };
    }

    // Obtener los detalles del usuario desde el modelo User
    const user = await User.findOne({ where: { id: userCredentials.id } });

    if (!user) {
      return {
        error: true,
        response: "Detalles del usuario no encontrados",
      };
    }

    // Verificamos que la cuenta no esté eliminada
    if (user.isDeleted) {
      return {
        deleted: true,
        error: true,
        response: "El usuario fue eliminado, contactese con el administrador del sitio",
      };
    }

    // Verificamos que la cuenta esté activa
    if (!user.isActive) {
      return {
        resendMail: true,
        error: true,
        response: "El usuario no se encuentra activo, verifique su casilla de correo para verificar su dirección de email",
      };
    }

    // Verificamos la contraseña usando bcrypt
    const isPasswordValid = bcrypt.compareSync(password, userCredentials.password);
    if (!isPasswordValid) {
      return {
        error: true,
        response: "Contraseña incorrecta",
      };
    }

    // Obtener el rol del usuario
    const userRole = await UserRole.findByPk(user.rolId);
    if (!userRole) {
      return {
        error: true,
        response: "Rol del usuario no encontrado",
      };
    }

    const { role_name } = userRole;

    // Datos para el token
    const dataForToken = {
      userId: user.id,
      username: `${user.name} ${user.surname}`,
      userRole: role_name,
    };

    // Generar el token
    const tokenSession = jwt.sign(dataForToken, secret, { expiresIn: '2h' });

    // Retornamos los datos al handler
    return {
      login: true,
      tokenSession,
      userId: user.id,
      user: `${user.name} ${user.surname}`,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      response: "Error interno del servidor",
    };
  }
};

module.exports = { loginUser };
