const joi = require('joi');
const unitsModels = require('../models/units');
const { messageError } = require('../middwares/errors');

const {
  USER_NOT_PRIVILEGES, 
  UNIT_REGISTERED } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS, 
  INTERNAL_ERROR_STATUS, 
  NOT_FOUND_STATUS,
  UNAUTHORIZED_STATUS } = require('../middwares/httpStatus');

const userSchema = joi.object({
  abbreviation: joi.string().required(),
  description: joi.string().required(),
  value: joi.number().required(),
});



const validateUnit = (unit) => {
  const result = userSchema.validate(unit);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const getId = async (id) => {
  const unit = await unitsModels.getById(id);

  if (!unit) {
    throw messageError(NOT_FOUND_STATUS, UNIT_NOT_EXIST);
  }

  return unit;
};

const create = async (unit, login) => {
  const { abbreviation } = unit

  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  validateUnit(unit);
 
  const unitExists = await getByAbbreviation(abbreviation);

  if (unitExists) {
    throw messageError(CONFLICT_STATUS, UNIT_REGISTERED);
  }

  const newUnit = await unitsModels.create(unit);

  if (!newUnit) {
    throw messageError(INTERNAL_ERROR_STATUS, UNIT_NOT_CREATED);
  }

  return newUnit;
};

const getAll = async () => unitsModels.getAll();

const getByAbbreviation = async (abbreviation) => unitsModels.getByAbbreviation(abbreviation);

const getById = async (id) => {
  const unit = await getId(id);

  return unit;
};

const remove = async (id, login) => {
  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  const unit = await getId(id);

  removeUnit = await unitsModels.remove(unit.unitId);
};

module.exports = {
  create,
  getAll,
  getByAbbreviation,
  getById,
  remove,
};
