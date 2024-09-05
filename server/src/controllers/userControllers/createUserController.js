const { User, UserRole, UserCredentials } = require("../../db");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const { name, surname, birthdate, email, telephone, password, roleId } = userData;

    if(!name||!surname||!birthdate||!email||!telephone||!password){
      return{
        error:true,
        response:"Faltan datos"
      }
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return {
        error: true,
        response: "El correo ya esta registrado",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    let assignedRoleId = roleId;

    if (roleId) {
      const existingRole = await UserRole.findByPk(roleId);
      if (!existingRole) {
        console.log("El rol especificado no existe. Se asignará el rol por defecto.");
        assignedRoleId = null;
      }
    }

    if (!assignedRoleId) {
      const [defaultRole, created] = await UserRole.findOrCreate({
        where: { role_name: "customer" },
        defaults: {
          role_name: "customer",
        },
      });
      assignedRoleId = defaultRole.id; 
    }

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

    await UserCredentials.create({
      id: newUser.id,   
      username: email, 
      password: hashedPassword, 
      UserId:newUser.id
    });

    return newUser;
  } catch (error) {
    return {
      error: true,
      response: "Error al crear usuario.",
    };
  }
};

module.exports = {
  createUser,
};
