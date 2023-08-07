import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { validateResults } from "../utils/handlerValidator";

export const validateFilm = [
  check("title").exists().notEmpty().withMessage("title is required"),
  check("episode_id").exists().notEmpty().withMessage("episode_id is required"),
  check("opening_crawl")
    .exists()
    .notEmpty()
    .withMessage("opening_crawl is required"),
  check("director").exists().notEmpty().withMessage("director is required"),
  check("producer").exists().notEmpty().withMessage("productor is required"),
  check("release_date")
    .exists()
    .notEmpty()
    .withMessage("release_date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("format from release_date must be [YYYY-MM-DD]."),
  check("characters")
    .exists()
    .notEmpty()
    .withMessage("list whith id of characters is required"),
  check("planets")
    .exists()
    .notEmpty()
    .withMessage("list whith id ofplanets is required"),
  check("starships")
    .exists()
    .notEmpty()
    .withMessage("list whith id of starships is required"),
  check("vehicles")
    .exists()
    .notEmpty()
    .withMessage("list whith id of vehicles is required"),
  check("species")
    .exists()
    .notEmpty()
    .withMessage("list whith id of species is required"),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResults(req, res, next);
  },
];
