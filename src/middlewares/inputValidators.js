const Joi = require('joi');

const signUpValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }
};

const loginValidator = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ status: 'error', message: error.details[0].message });
  }
};

module.exports = Object.freeze({
    signUpValidator,
    loginValidator
})