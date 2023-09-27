import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain, body, param } from "express-validator";

export const expressValidate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ errors: errors.array() });
  };
};

export const validateSignup = [
  body('firstName').notEmpty().withMessage('firstName is required'),
  body('lastName').notEmpty().withMessage('lastName is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number'),
];

export const validateSignIn = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateUserId = [param("id").isNumeric().withMessage("User ID must be a number").toInt()];
