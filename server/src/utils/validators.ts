import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

const validateLogin = [
  body("email").trim().trim().isEmail().withMessage({message: "Not a valid email address"}),
  body("password").trim().isLength({min: 8}).withMessage({message: "Password should have at least 8 characters"}),
];

const validateRegister = [
  body("name").trim().notEmpty().withMessage({message: "Name is empty"}),
  ...validateLogin
];

const validateChat = [
  body("message").trim().notEmpty().withMessage({message: "Message is required"}),
];

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req)
      if (!result.isEmpty()) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(422).json({errors: errors.array()})
  }
}

export {validate, validateRegister, validateLogin, validateChat};