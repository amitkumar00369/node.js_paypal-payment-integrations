const { validationResult } = require("express-validator");
const error = require("../utils/error");
const errorResponse = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(error.status.UnprocessableEntity).json({
        status: error.status.UnprocessableEntity,
        message: errors.array({ onlyFirstError: true })[0].msg,
        fieldError: errors.array({ onlyFirstError: true }),
      });
    } else {
      next();
    }
  } catch (e) {
    return res.status(error.status.INTERNAL_SERVER_ERROR).json({
      status: error.status.INTERNAL_SERVER_ERROR,
      message: req.msg.SomethingWentWrong,
    });
  }
};

module.exports = { errorResponse };