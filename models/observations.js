const connection = require('./connections');

const mountCondition = (field) => {
  switch (field) {
    case 'object':
      return ' objectId = ?';
    
    case 'filter':
      return ' filterId = ?';

    case 'comparation':
      return ' comparationId = ?';

    case 'beginJd':
      return ' jd >= ?';

    case 'endJd':
      return ' jd <= ?';

    default:
      return;
  }
}

const mountQuery = (query) => {
  let queryString = 'SELECT * FROM Observations';
  let queryCondition = '';

  if (Object.keys(query).length !== 0) {
    queryCondition = ' WHERE';

    Object.keys(query).forEach((field, index) => {
      queryCondition += mountCondition(field);

      if (index < Object.keys(query).length - 1) {
        queryCondition += ' AND';
      }
    });
  }

 return queryString + queryCondition + ';';
}

const create = async(observation) => {
  const { objectId, comparationId, filterId, jd, mag, mErr, airMass } = observation;

  const [newObservation] = await connection.execute(
    'INSERT INTO Observations (objectId, filterId, comparationId, jd, mag, mErr, airMass) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [objectId, filterId, comparationId, jd, mag, mErr, airMass]
  );
  
  const fields = await getById(newObservation.insertId);
  return fields;
}

const getAll = async(query) => {
  const [observation] = await connection.execute(mountQuery(query), Object.values(query));

  return observation;
};

const getById = async(id) => {
  const [observation] = await connection.execute('SELECT * FROM Observations WHERE obsId = ?', [id]);

  return observation[0];
}


const getByObservation = async (objectId, filterId, jd) => {
  const [observation] = await connection.execute('SELECT * FROM Observations WHERE objectId = ? AND filterId = ? AND jd = ?',
  [objectId, filterId, jd]);

  return observation[0];
}

const remove = async (id) => connection.execute('DELETE FROM Observations WHERE obsId = ?', [id]);

module.exports = {
  create,
  getAll,
  getById,
  getByObservation,
  remove,
}
