import { body, validationResult } from "express-validator";

const signupvalidation = [
  body("name").trim().isString().notEmpty().withMessage("user Name is reuired"),
  body("email").trim().isEmail().withMessage("provide valid Email Address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 letters"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    next();
  },
];

export { signupvalidation };
