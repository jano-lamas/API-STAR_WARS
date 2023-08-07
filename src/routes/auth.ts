import { Router } from "express";
import { AuthCtrl } from "../controllers/auth";
const router = Router();

router.post("/register", AuthCtrl.register);
router.post("/login", AuthCtrl.login);
router.post("/refreshtoken", AuthCtrl.refreshToken);

export { router };
