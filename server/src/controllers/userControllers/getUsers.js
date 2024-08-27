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


module.exports={
    getUsers
}