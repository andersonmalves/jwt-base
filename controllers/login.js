const { userModel } = require('../models');

const findUser = async (req, res) => {
  try {
    const { username } = req.body;
    const result = await userModel.findUser(username);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Não foi possível localizar o usuário.' });
  }
}

module.exports = {
  findUser
};
