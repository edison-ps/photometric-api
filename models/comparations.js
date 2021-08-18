const connection = require('./connections');

const create = async(comp) => {
  const { comparation, ra, dec, mag, chart } = comp;

  const [newComp] = await connection.execute(
    'INSERT INTO Comparations (comparation, ra, `dec`, mag, chart) VALUES (?, ?, ?, ?, ?)',
    [comparation.toUpperCase(), ra, dec, mag, chart]
  );
  
  const fields = await getById(newComp.insertId);
  return fields;
}

const getAll = async() => {
  const [comparations] = await connection.execute('SELECT * FROM Comparations');

  return comparations;
};

const getByComparation = async(comparation) => { 
  const [comp] = await connection.execute('SELECT * FROM Comparations WHERE comparation = ?',
    [comparation.toUpperCase()]);

  return comp[0];
};

const getById = async(id) => {
  const [comp] = await connection.execute('SELECT * FROM Comparations WHERE comparationId = ?', [id]);

  return comp[0];
}

const remove = async (id) => connection.execute('DELETE FROM Comparations WHERE comparationId = ?', [id]);

module.exports = {
  create,
  getAll,
  getByComparation,
  getById,
  remove,
}
