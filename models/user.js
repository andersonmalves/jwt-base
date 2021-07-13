const connection = require('./connection');

const createUser = async (username, password) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ username, password }));
  return result.ops[0].username;
}

const findUser = async (username) => {
  const result = await connection().then((db) =>
    db.collection('users').findOne({ username }));
  return result;
};

module.exports = {
  createUser,
  findUser
};
