const joi = require('joi');
const observationsModels = require('../models/observations');
const objectsServices = require('./objects');
const filtersServices = require('./filters');
const comparationsServices = require('./comparations');

const { messageError } = require('../middwares/errors');

const {
  OBJECT_NOT_EXIST, 
  FILTER_NOT_EXIST,
  COMPARATION_NOT_EXIST,
  OBSERVATION_NOT_CREATED, 
  OBSERVATION_NOT_EXIST,
  OBSERVATION_REGISTERED } = require('../middwares/errorMessages');

const {
  BAD_REQUEST_STATUS,
  INTERNAL_ERROR_STATUS, 
  NOT_FOUND_STATUS,
  UNAUTHORIZED_STATUS, 
  CONFLICT_STATUS } = require('../middwares/httpStatus');

const observationSchema = joi.object({
  object: joi.string().required(),
  filter: joi.string().required(),
  comparation: joi.string(),
  jd: joi.number().required(),
  mag: joi.number().required(),
  mErr: joi.number().required(),
  airMass: joi.number()
});

const querySchema = joi.object({
  object: joi.string(),
  filter: joi.string(),
  comparation: joi.string(),
  beginJd: joi.number(),
  endJd: joi.number()
});

const validateObservation = (observation) => {
  const result = observationSchema.validate(observation);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const validateQuery = (query) => {
  const result = querySchema.validate(query);

  if (result.error) {
    throw messageError(BAD_REQUEST_STATUS, result.error.message);
  }
};

const getObservation = async (id) => {
  const observation = await observationsModels.getById(id);

  if (!observation) {
    throw messageError(NOT_FOUND_STATUS, OBSERVATION_NOT_EXIST);
  }

  return observation;
};

const getObject = async (objectName) => {
  const object = await objectsServices.getByObject(objectName);

  if (!object) {
    throw messageError(NOT_FOUND_STATUS, OBJECT_NOT_EXIST);
  }

  return object;
};

const getFilter = async (filterName) => {
  const filter = await filtersServices.getByName(filterName);

  if (!filter) {
    throw messageError(NOT_FOUND_STATUS, FILTER_NOT_EXIST);
  }

  return filter;
};

const getComparation = async (comparationName) => {
  const comparation = await comparationsServices.getByComparation(comparationName);

  if (!comparation) {
    throw messageError(NOT_FOUND_STATUS, COMPARATION_NOT_EXIST);
  }

  return comparation;
};

const create = async (observation, login) => {
  const { object, filter, comparation, jd, mag, mErr, airMass } = observation;

  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  validateObservation(observation);

  const objectExists = await getObject(object);

  const objectId = objectExists.objectId

  const filterExists = await getFilter(filter);

  const filterId = filterExists.filterId;

  const observationExists = await observationsModels.getByObservation(objectId, filterId, jd);

  if (observationExists) {
    throw messageError(CONFLICT_STATUS, OBSERVATION_REGISTERED);
  }
  
  let comparationId;

  if (comparation && comparation !== 'na') {
    const comparationExists = await getComparation(comparation);

    comparationId = comparationExists.comparationId;

  } else {
    comparationId = null;
  }

  if (!airMass) {
    valueAirMass = null;
  } else {
    valueAirMass = airMass;
  }
 
  obs = {
    objectId,
    filterId,
    comparationId,
    jd,
    mag,
    mErr,
    airMass: valueAirMass
  }

  const newObservation = await observationsModels.create(obs);

  if (!newObservation) {
    throw messageError(INTERNAL_ERROR_STATUS, OBSERVATION_NOT_CREATED);
  }

  return newObservation;
};

const getAll = async (query) => {
  const fields = {};

  if (Object.keys(query).length !== 0) {
    validateQuery(query);

    if (query.object) {
      object = await getObject(query.object);
      fields.object = object.objectId;
    }

    if (query.filter) {
      filter = await getFilter(query.filter);
      fields.filter = filter.filterId;
    }

    if (query.comparation) {
      comparation = await getComparation(query.comparation);
      fields.comparation = comparation.comparationId;
    }

    if (query.beginJd) {
      fields.beginJd = query.beginJd;
    }

    if (query.endJd) {
      fields.endJd = query.endJd;
    }
  }

  const allObservations = await observationsModels.getAll(fields);

  return allObservations;
}


const getById = async (id) => {
  const observation = await getObservation(id);

  return observation;
};

const remove = async (id, login) => {
  if (login.type !== 'admin') {
    throw messageError(UNAUTHORIZED_STATUS, USER_NOT_PRIVILEGES);
  }

  const observation = await getObservation(id);

  removeObservation = await observationsModels.remove(observation.unitId);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
