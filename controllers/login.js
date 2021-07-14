const { userModel } = require('../models');

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });

    const result = await userModel.findUser(username);

    if (!result || result.password !== password) return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

    return res.status(200).json({ message: 'Login efetuado com sucesso'})
  } catch (error) {
    return res.status(500).json({ message: 'Não foi possível localizar o usuário.' });
  }
}

module.exports = userLogin;
