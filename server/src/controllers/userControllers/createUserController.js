const { User, UserRole } = require("../../db"); // Asegúrate de tener el modelo User y UserRole en db.js
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const { name, surname, birthdate, email, telephone, password, roleId } = userData;

    // Verificamos si el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El correo ya está registrado.");
    }

    // Hash de la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 8);

    // Verificar si el rol existe, si se proporciona
    if (roleId) {
      const existingRole = await UserRole.findByPk(roleId);
      if (!existingRole) {
        throw new Error("El rol especificado no existe.");
      }
    }

    // Crear el nuevo usuario
    const newUser = await User.create({
      name,
      surname,
      birthdate,
      email,
      telephone,
      isActive: false, // Inicialmente el usuario no está activo hasta que verifique su correo
      isVerified: false,
      password: hashedPassword,
      rolId: roleId || null, // Asignar rol si se proporciona
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  // Otros controladores aquí...
};
