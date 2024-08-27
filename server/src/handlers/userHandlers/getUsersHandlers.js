const { getUsers } = require("../../controllers/userControllers/getUsers");

const getUserhandler = async (req, res) => {
  try {
      console.log(getUsers)
    const response = await getUsers();
    if (response.error) return res.status(404).json(response.response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


module.exports={
    getUserhandler
}