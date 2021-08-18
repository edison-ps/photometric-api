const connection = require('./connections');

const create = async(obj) => {
  const { object, ra, dec, maxMag, minMag, period, type } = obj;

  const [newObj] = await connection.execute(
    'INSERT INTO Objects (object, ra, `dec`, maxMag, minMag, period, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [object.toUpperCase(), ra, dec, maxMag, minMag, period, type]
  );
  
  const fields = await getById(newObj.insertId);
  return fields;
}

const getAll = async() => {
  const [objects] = await connection.execute('SELECT * FROM Objects');

  return objects;
};

const getByObject = async(object) => { 
  const [obj] = await connection.execute('SELECT * FROM Objects WHERE object = ?',
    [object.toUpperCase()]);

  return obj[0];
};

const getById = async(id) => {
  const [obj] = await connection.execute('SELECT * FROM Objects WHERE objectId = ?', [id]);

  return obj[0];
}

const remove = async (id) => connection.execute('DELETE FROM Objects WHERE objectId = ?', [id]);

module.exports = {
  create,
  getAll,
  getByObject,
  getById,
  remove,
}
