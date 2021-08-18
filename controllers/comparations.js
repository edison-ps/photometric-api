const comparationsServices = require('../services/comparations');

const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const comp = req.body;
    const { login } = req;
    const newComp = await comparationsServices.create(comp, login);

    return res.status(CREATED_STATUS).json(newComp);
  } catch (err) {
    next(err);
}
};

const getAll = async (_req, res, next) => {
  try {
    const allComps = await comparationsServices.getAll();

    return res.status(OK_STATUS).json(allComps);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comp = await comparationsServices.getById(id);

    return res.status(OK_STATUS).json(comp);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { login } = req;

    const comp = await comparationsServices.remove(id, login);

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