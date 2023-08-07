import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { validateResults } from "../utils/handlerValidator";

export const validateFilm = [
  check("name").exists().notEmpty().withMessage("name is required"),
  check("lastName").exists().notEmpty().withMessage("lastName is required"),
  check("email")
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),
  check("password").exists().notEmpty().withMessage("password is required"),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];
