const jwt = require('jsonwebtoken');
const { messageError } = require('./errors');
const { TOKEN_INVALID, TOKEN_NOT_FOUND } = require('./errorMessages');
const { UNAUTHORIZED_STATUS } = require('./httpStatus');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const validateToken = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;

    try {
      if (!token) {
        throw messageError(UNAUTHORIZED_STATUS, TOKEN_NOT_FOUND);
      }
    } catch (err) {
      return next(err);
    }

    const payload = jwt.verify(token, JWT_SECRET);

    req.login = payload;
    next();
  } catch (err) {
    next(messageError(UNAUTHORIZED_STATUS, TOKEN_INVALID));
  }
};

module.exports = { validateToken };