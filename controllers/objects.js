const objectsServices = require('../services/objects');

const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const obj = req.body;
    const { login } = req;
    const newObj = await objectsServices.create(obj, login);

    return res.status(CREATED_STATUS).json(newObj);
  } catch (err) {
    next(err);
}
};

const getAll = async (_req, res, next) => {
  try {
    const allObjects = await objectsServices.getAll();

    return res.status(OK_STATUS).json(allObjects);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const obj = await objectsServices.getById(id);

    return res.status(OK_STATUS).json(obj);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { login } = req;

    const obj = await objectsServices.remove(id, login);

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