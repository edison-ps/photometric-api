const connection = require('./connections');

const create = async(unit) => {
  const { abbreviation, description, value } = unit;

  const [newUnit] = await connection.execute(
    'INSERT INTO Units (abbreviation, description, value) VALUES (?, ?, ?)',
    [abbreviation, description, value]
  );
  
  const fields = await getById(newUnit.insertId);
  return fields;
}

const getAll = async() => {
  const [units] = await connection.execute('SELECT * FROM Units');

  return units;
};


const getByAbbreviation = async(abbreviation) => { 
  const [unit] = await connection.execute('SELECT * FROM Units WHERE abbreviation = ?', [abbreviation]);

  return unit[0];
};


const getById = async(id) => {
  const [unit] = await connection.execute('SELECT * FROM Units WHERE unitId = ?', [id]);

  return unit[0];
}

const remove = async (id) => connection.execute('DELETE FROM Units WHERE unitId = ?', [id]);

module.exports = {
  create,
  getAll,
  getByAbbreviation,
  getById,
  remove,
}
