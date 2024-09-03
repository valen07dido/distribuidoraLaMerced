// controllers/userControllers/logoutController.js
const { BlackListedTokens } = require("../../db");

// Controlador para cerrar sesión (Logout)
const logoutUser = async (token) => {
  try {
    // Agregar el token a la lista negra
    await BlackListedTokens.create({ token });

    return {
      success: true,
      message: "Sesión cerrada exitosamente.",
    };
  } catch (error) {
    return {
      error: true,
      response: "Error al cerrar sesion",
    };
  }
};

module.exports = { logoutUser };
