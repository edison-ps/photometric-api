const unitsServices = require('../services/units');

const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const unit = req.body;
    const { login } = req;
    const newUnit = await unitsServices.create(unit, login);

    return res.status(CREATED_STATUS).json(newUnit);
  } catch (err) {
    next(err);
}
};

const getAll = async (_req, res, next) => {
  try {
    const allUnits = await unitsServices.getAll();

    return res.status(OK_STATUS).json(allUnits);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const unit = await unitsServices.getById(id);

    return res.status(OK_STATUS).json(unit);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { login } = req;

    const unit = await unitsServices.remove(id, login);

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