const { User, UserRole } = require("../../db");

const getUsers = async () => {
  const user = await User.findAll();
  if (user.length === 0) {
    return {
      error: true,
      response: `Users not found`,
    };
  }
  return user;
};
const getUsersByID = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return {
      error: true,
      response: `User not found`,
    };
  }
  return user;
};

module.exports = {
  getUsers,
  getUsersByID
};
