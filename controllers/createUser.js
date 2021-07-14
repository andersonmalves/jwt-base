const { userModel } = require('../models');

const createUser =  async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await userModel.createUser(username, password);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao salvar o usuário no banco' });
  }
}

module.exports = createUser;
