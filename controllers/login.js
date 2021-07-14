const { userModel } = require('../models');
const jwt = require('jsonwebtoken'); // faz o import da biblioteca

const secret = 'imagineaquiumasenhamuitoforte'; // informa a senha

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });

    const result = await userModel.findUser(username);

    if (!result || result.password !== password) return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

    const jwtConfig = {
      expiresIn: '15m', // tempo para o token expirar
      algorithm: 'HS256', // o tipo de algoritmo
    };

    const token = jwt.sign({ data: result.username }, secret, jwtConfig) // assinatura do token com 3 parâmetros: o payload, a senha e as configurações
 
    return res.status(200).json({ token }) // retornar o token criado
  } catch (error) {
    return res.status(500).json({ message: 'Não foi possível localizar o usuário.' });
  }
}

module.exports = userLogin;
