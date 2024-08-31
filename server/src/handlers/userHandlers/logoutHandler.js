
const logoutHandler = (req, res) => {
    try {
      res.clearCookie("access-token"); // Eliminar la cookie del token de acceso
      return res.status(200).json({ message: "Sesión cerrada correctamente." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        response: "Error al cerrar sesión.",
      });
    }
  };
  
  module.exports = { logoutHandler };
  