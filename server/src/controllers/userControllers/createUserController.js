const { User, UserRole, UserCredentials } = require("../../db");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const { name, surname, birthdate, email, telephone, password, roleId } = userData;

    // Verificar si el usuario ya existe por su correo electrónico
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El correo ya está registrado.");
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    let assignedRoleId = roleId;

    // Verificar si el rol proporcionado existe o usar el rol por defecto
    if (roleId) {
      const existingRole = await UserRole.findByPk(roleId);
      if (!existingRole) {
        console.log("El rol especificado no existe. Se asignará el rol por defecto.");
        assignedRoleId = null;
      }
    }

    // Usar `findOrCreate` para obtener o crear el rol por defecto "customer"
    if (!assignedRoleId) {
      const [defaultRole, created] = await UserRole.findOrCreate({
        where: { role_name: "customer" },
        defaults: {
          role_name: "customer",
        },
      });
      assignedRoleId = defaultRole.id; // Asignar el id del rol por defecto "customer"
    }

    // Crear el nuevo usuario con el rol asignado
    const newUser = await User.create({
      name,
      surname,
      birthdate,
      email,
      telephone,
      isActive: false,
      isVerified: false,
      password: hashedPassword,
      rolId: assignedRoleId,
    });

    // Crear las credenciales del usuario
    await UserCredentials.create({
      id: newUser.id,   
      username: email, 
      password: hashedPassword, 
      UserId:newUser.id
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
};
