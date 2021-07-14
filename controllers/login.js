const { userModel } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const secret = 'imagineaquiumasenhamuitoforte';

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });

    const result = await userModel.findUser(username);

    if (!result) return res.status(401).json({ message: 'Usuário não existe' }); //

    const isMatch = bcrypt.compareSync(password, result.password);

    if (!isMatch) return res.status(401).json({ message: 'Senha inválida' });;

    const jwtConfig = {
      expiresIn: '15m',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: result.username }, secret, jwtConfig)
 
    return res.status(200).json({ token })
  } catch (error) {
    return res.status(500).json({ message: 'Não foi possível localizar o usuário.' });
  }
}

module.exports = userLogin;
