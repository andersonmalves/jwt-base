const { userModel } = require('../../models');
const jwt = require('jsonwebtoken');

const segredo = 'imagineaquiumasenhamuitoforte';

const validateToken = async (req, res, next) => {

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, segredo); // usamos o método verify do jwt

    const result = await userModel.findUser(decoded.data);

    if (!result) {
      res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    }

    req.user = result;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = validateToken;