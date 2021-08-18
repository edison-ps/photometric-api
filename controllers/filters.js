const filtersServices = require('../services/filters');

const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const filter = req.body;
    const { login } = req;
    
    const newFilter = await filtersServices.create(filter, login);

    return res.status(CREATED_STATUS).json(newFilter);
  } catch (err) {
    next(err);
}
};

const getAll = async (_req, res, next) => {
  try {
    const allFilters = await filtersServices.getAll();

    return res.status(OK_STATUS).json(allFilters);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = await filtersServices.getById(id);

    return res.status(OK_STATUS).json(filter);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { login } = req;

    const filter = await filtersServices.remove(id, login);

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