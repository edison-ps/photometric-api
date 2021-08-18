const connection = require('./connections');

const create = async(filter) => {
  const { name, description, wavelength, unitId } = filter;

  const [newFilter] = await connection.execute(
    'INSERT INTO Filters (name, description, wavelength, unitId) VALUES (?, ?, ?, ?)',
    [name, description, wavelength, unitId]
  );
  
  const fields = await getById(newFilter.insertId);
  return fields;
}

const getAll = async() => {
  const [filters] = await connection.execute('SELECT * FROM Filters');

  return filters;
};

const getByName = async(name) => { 
  const [filter] = await connection.execute('SELECT * FROM Filters WHERE name = ?', [name]);

  return filter[0];
};

const getById = async(id) => {
  const [filter] = await connection.execute('SELECT * FROM Filters WHERE filterId = ?', [id]);

  return filter[0];
}

const remove = async (id) => connection.execute('DELETE FROM Filters WHERE filterId = ?', [id]);

module.exports = {
  create,
  getAll,
  getByName,
  getById,
  remove,
}
