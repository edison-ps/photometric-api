const joi = require('joi');
const comparationsModels = require('../models/comparations');
const { messageError } = require('../middwares/errors');

const {
  USER_NOT_PRIVILEGES, 
  COMPARATION_REGISTERED, 
  COMPARATION_NOT_CREATED, 
  COMPARATION_NOT_EXIST } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS, 
  INTERNAL_ERROR_STATUS, 
  NOT_FOUND_STATUS,
  UNAUTHORIZED_STATUS } = require('../middwares/httpStatus');

const compSchema = joi.object({
  comparation: joi.string().required(),
  ra: joi.string().required(),
  dec: joi.string().required(),
  mag: joi.number().required(),
  chart: joi.string().allow('', null),
});

const validateComp = (comp) => {
  const result = compSchema.validate(comp);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const getId = async (id) => {
  const comp = await comprationsModels.getById(id);

  if (!comp) {
    throw messageError(NOT_FOUND_STATUS, COMPARATION_NOT_EXIST);
  }

  return comp;
}

const create = async (comp, login) => {
  const { comparation, chart } = comp

  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  validateComp(comp);
 
  const comparationExists = await getByComparation(comparation);

  if (comparationExists) {
    throw messageError(CONFLICT_STATUS, COMPARATION_REGISTERED);
  }

  if (!chart) {
    comp.chart = null;
  }

  const newComp = await comparationsModels.create(comp);

  if (!newComp) {
    throw messageError(INTERNAL_ERROR_STATUS, COMPARATION_NOT_CREATED);
  }

  return newComp;
};

const getAll = async () => comparationsModels.getAll();

const getByComparation = async (comparation) => comparationsModels.getByComparation(comparation);

const getById = async (id) => {
  const comp = await getId(id);

  return comp;
};

const remove = async (id, login) => {
  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  const comp = await getId(id);

  removeComp = await comparationsModels.remove(comp.unitId);
};

module.exports = {
  create,
  getAll,
  getByComparation,
  getById,
  remove,
};
