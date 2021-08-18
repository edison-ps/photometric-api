const observationsServices = require('../services/observations');

const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const observation = req.body;
    const { login } = req;
    const newObservation = await observationsServices.create(observation, login);

    return res.status(CREATED_STATUS).json(newObservation);
  } catch (err) {
    next(err);
}
};

const getAll = async (req, res, next) => {
  try {
    const query = req.body;

    const allObservations = await observationsServices.getAll(query);

    return res.status(OK_STATUS).json(allObservations);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const observation = await observationsServices.getById(id);

    return res.status(OK_STATUS).json(observation);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { login } = req;

    const observation = await observationsServices.remove(id, login);

    return res.status(OK_STATUS).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};