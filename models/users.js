const connection = require('./connections');

const create = async(user) => {
  const { name, email, password } = user;

  const newUser = await connection.execute(
    'INSERT INTO Users (name, email, password, type) VALUES (?, ?, ?, ?)',
    [name, email, password, 'user']
  );

  return newUser;
}

const getAll = async() => {
  const [users] = await connection.execute('SELECT userId, name, email FROM Users');

  return users;
};


const getByEmail = async(email) => { 
  const [user] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);

  return user[0];
};


const getById = async(id) => {
  const [user] = await connection.execute('SELECT * FROM Users WHERE userId = ?', [id]);

  return user[0];
}

const remove = async (id) => connection.execute('DELETE FROM Users WHERE userId = ?', [id]);

module.exports = {
  create,
  getAll,
  getByEmail,
  getById,
  remove,
}
