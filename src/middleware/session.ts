import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { omit } from "lodash";
import _ from "lodash";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    const isUser: any = verifyToken(`${jwt}`);
    if (!isUser) {
      res.status(401);
      res.send("sesion not valid");
    } else {
      (req as any).user = { email: isUser?.email, type: isUser.type };
      next();
    }
  } catch (error) {
    res.status(400);
    res.send({ error });
  }
};
