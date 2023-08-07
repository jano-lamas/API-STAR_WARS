import { Request, Response } from "express";
import UserModel from "../service/auth";
import { IUser } from "../interfaces/user";
import { IAuth } from "../interfaces/auth";
import { generateToken, verifyToken } from "../utils/jwt.handle";
import { userModel } from "../bd/models/user";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user: IUser = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        type: !req.body.type ? ["Usuarios Regulares"] : req.body.type,
      };
      const data = await UserModel.registerNewUser(user);
      res.status(200).json({ data });
    } catch (error) {
      console.log("entra error;", error);
      res.status(500).json({ message: error });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const login: IAuth = {
        email: req.body.email,
        password: req.body.password,
      };
      const data = await UserModel.loginUser(login);
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = <string>req.headers.authorization;
      const email = req.body.email;

      const jwt = refreshToken.split(" ").pop();
      const isUser = verifyToken(`${jwt}`);

      if (!isUser) {
        res.status(401).json("invalid session");
      }

      const checkUser = await userModel.findOne({ email });

      const newToken = generateToken(email, checkUser?.type);
      res.status(200).json({ newToken });
    } catch (error) {
      res.status(401).json({ error: "Invalid or expired refresh token" });
    }
  }
}

export const AuthCtrl = new AuthController();
