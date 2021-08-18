const joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModels = require('../models/users');
const { messageError } = require('../middwares/errors');

const {
  USER_REGISTERED,
  USER_NOT_CREATED,
  INVALID_FIELDS, 
  USER_NOT_EXIST,
  USER_NOT_PRIVILEGES } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS, 
  INTERNAL_ERROR_STATUS, 
  NOT_FOUND_STATUS,
  UNAUTHORIZED_STATUS } = require('../middwares/httpStatus');

const jwtConfig = {
  expiresIn: '8h',
  algorithm: 'HS256',
};

require('dotenv').config();

const { JWT_SECRET } = process.env;

const userSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const validateUser = (user) => {
  const result = userSchema.validate(user);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const validateLogin = (user) => {
  const result = loginSchema.validate(user);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const generateToken = (id, name, email, type) => {
  const jwtUser = {
    id,
    name,
    email,
    type,
  };

  const token = jwt.sign(jwtUser, JWT_SECRET, jwtConfig);

  return ({ token });
};

const getAll = async () => usersModels.getAll();

const getByEmail = async (email) => usersModels.getByEmail(email);

const create = async (user, login) => {
  const { name, email, password } = user;
  const validateFields = {
    name,
    email,
    password,
  };

  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  validateUser(validateFields);

  const userExists = await getByEmail(email);

  if (userExists) {
    throw messageError(CONFLICT_STATUS, USER_REGISTERED);
  }

  const newUser = await usersModels.create(user);

  if (!newUser) {
    throw messageError(INTERNAL_ERROR_STATUS, USER_NOT_CREATED);
  }

  return generateToken(newUser.userId, name, email, 'user');
};

const login = async (user) => {
  const { email, password } = user;

  validateLogin(user);

  const searchUser = await usersModels.getByEmail(email);

  if (!searchUser || searchUser.password !== password) {
    throw messageError(BAD_REQUEST_STATUS, INVALID_FIELDS);
  }

  return generateToken(searchUser.userId, searchUser.name, email, searchUser.type);
};

const getById = async (id) => {
  const user = await usersModels.getById(id);

  if (!user) {
    throw messageError(NOT_FOUND_STATUS, USER_NOT_EXIST);
  }

  return user;
};

const remove = async (email, login) => {
  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  const user = await usersModels.getByEmail(email);

  if (!user) {
    throw messageError(NOT_FOUND_STATUS, USER_NOT_EXIST);
  }

  removeUser = await usersModels.remove(user.userId);
    
};

module.exports = {
  create,
  getAll,
  getById,
  login,
  remove,
};
