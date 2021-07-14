const { userModel } = require('../models');
const bcrypt = require('bcrypt-nodejs');

const createUser =  async (req, res) => {
  try {
    const { username } = req.body; // modifica
    let password = req.body.password;

    const salt  = bcrypt.genSaltSync(5) // quantidade de vezes que eu vou aplicar a criptografia
    password = bcrypt.hashSync(password, salt);

    const result = await userModel.createUser(username, password);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao salvar o usuário no banco' });
  }
}

module.exports = createUser;
