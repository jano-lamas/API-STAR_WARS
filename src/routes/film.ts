import { Router } from "express";
import { FilmCtrl } from "../controllers/film";
import { checkJwt } from "../middleware/session";
import { validateFilm } from "../validators/film";
import { checkRol } from "../middleware/rol";

const router = Router();

router.get("/", FilmCtrl.getAll);
router.get(
  "/:id",
  checkJwt,
  checkRol(["Usuarios Regulares"]),
  FilmCtrl.findOne
);
router.post(
  "/",
  checkJwt,
  checkRol(["Administrador"]),
  validateFilm,
  FilmCtrl.insert
);
router.put(
  "/:id",
  checkJwt,
  checkRol(["Administrador"]),
  validateFilm,
  FilmCtrl.update
);
router.delete(
  "/:id",
  checkJwt,
  checkRol(["Administrador"]),
  FilmCtrl.deleteOne
);

export { router };
