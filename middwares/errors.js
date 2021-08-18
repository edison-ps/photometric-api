const { INTERNAL_ERROR_STATUS } = require('./httpStatus');

const messageError = (status, message) => 
  ({ status, message });

const sendErrorMessage = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(INTERNAL_ERROR_STATUS).json(err);
};

module.exports = {
  messageError,
  sendErrorMessage,
};
