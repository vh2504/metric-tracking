const { validationResult } = require('express-validator');
const { responseCode } = require('../base/responseCode');

const resultValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error(responseCode.BAD_REQUEST.name, errors.array()?.[0]?.msg ,responseCode.BAD_REQUEST.code)
  }
  next();
}

module.exports = {
  resultValidator
};
