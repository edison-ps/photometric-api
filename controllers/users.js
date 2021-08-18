const userServices = require('../services/users');

const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const user = req.body;
    const { login } = req;
    const newUser = await userServices.create(user, login);

    return res.status(CREATED_STATUS).json(newUser);
  } catch (err) {
    next(err);
}
};

const login = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await userServices.login(user);

    return res.status(OK_STATUS).json(token);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const allUsers = await userServices.getAll();

    return res.status(OK_STATUS).json(allUsers);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await userServices.getById(req.params.id);

    return res.status(OK_STATUS).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { login } = req;

    const user = await userServices.remove(email, login);

    return res.status(OK_STATUS).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  login,
  remove,
};