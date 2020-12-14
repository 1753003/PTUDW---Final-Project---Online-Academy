const ajv = require('ajv');

module.exports = schema => (req, res, next) => {
  const ajvObj = new ajv({ allErrors: true });
  const validator = ajvObj.compile(schema);
  const valid = validator(req.body);
  if (!valid) {
    return res.status(400).json(validator.errors);
  }

  next();
}