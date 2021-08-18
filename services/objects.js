const joi = require('joi');
const objectsModels = require('../models/objects');
const { messageError } = require('../middwares/errors');

const {
  OBJECT_REGISTERED,
  OBJECT_NOT_CREATED,
  OBJECT_NOT_EXIST } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS, 
  INTERNAL_ERROR_STATUS, 
  NOT_FOUND_STATUS,
  UNAUTHORIZED_STATUS } = require('../middwares/httpStatus');

const objSchema = joi.object({
  object: joi.string().required(),
  ra: joi.string().required(),
  dec: joi.string().required(),
  maxMag: joi.number(),
  minMag: joi.number(),
  period: joi.number(),
  type: joi.string(),
});

const validateObj = (obj) => {
  const result = objSchema.validate(obj);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const getId = async (id) => {
  const object = await objectsModels.getById(id);

  if (!object) {
    throw messageError(NOT_FOUND_STATUS, OBJECT_NOT_EXIST);
  }

  return object;
};

const create = async (obj, login) => {
  const { object } = obj

  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  validateObj(obj);

  const objectExists = await getByObject(object);

  if (objectExists) {
    throw messageError(CONFLICT_STATUS, OBJECT_REGISTERED);
  }

  const newObj = await objectsModels.create(obj);

  if (!newObj) {
    throw messageError(INTERNAL_ERROR_STATUS, OBJECT_NOT_CREATED);
  }

  return newObj;
};

const getAll = async () => objectsModels.getAll();

const getById = async (id) => {
  const obj = await getId(id);

  return obj;
};

const getByObject = async (object) => objectsModels.getByObject(object);

const remove = async (id, login) => {
  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  const obj = await getId(id);

  removeObj = await objectsModels.remove(obj.unitId);
};

module.exports = {
  create,
  getAll,
  getByObject,
  getById,
  remove,
};
