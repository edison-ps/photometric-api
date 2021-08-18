const joi = require('joi');
const filtersModels = require('../models/filters');
const unitsModels = require('../models/units');
const { messageError } = require('../middwares/errors');

const {
  USER_NOT_PRIVILEGES, 
  FILTER_REGISTERED,
  FILTER_NOT_CREATED,
  FILTER_NOT_EXIST,
  UNIT_NOT_EXIST } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS, 
  INTERNAL_ERROR_STATUS, 
  NOT_FOUND_STATUS,
  UNAUTHORIZED_STATUS } = require('../middwares/httpStatus');

const filterSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  wavelength: joi.number(),
  unitId: joi.number().required(),
});

const validateFilter = (filter) => {
  const result = filterSchema.validate(filter);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const getId = async (id) => {
  const filter = await filtersModels.getById(id);

  if (!filter) {
    throw messageError(NOT_FOUND_STATUS, FILTER_NOT_EXIST);
  }

  return filter;
};

const create = async (filter, login) => {
  const { name, unitId } = filter;

  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  validateFilter(filter);

  const unitExists = await unitsModels.getById(unitId);

  if (!unitExists) {
    throw messageError(NOT_FOUND_STATUS, UNIT_NOT_EXIST);
  }

  const filterExists = await getByName(name);

  if (filterExists) {
    throw messageError(CONFLICT_STATUS, FILTER_REGISTERED);
  }
  
  const newFilter = await filtersModels.create(filter);

  if (!newFilter) {
    throw messageError(INTERNAL_ERROR_STATUS, FILTER_NOT_CREATED);
  }

  return newFilter;
};

const getAll = async () => filtersModels.getAll();

const getById = async (id) => {
  const filter = await getId(id);

  return filter;
};

const getByName = async (name) => filtersModels.getByName(name);

const remove = async (id, login) => {
  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  const filter = await getId(id);

  removeFilter = await filtersModels.remove(filter.unitId);
    
};

module.exports = {
  create,
  getAll,
  getByName,
  getById,
  remove,
};
