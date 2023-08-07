import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

export const checkRol =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: any = get(req, "user");
      const rolesByUser = user?.type;

      const checkValueRol = roles.some((rolSingle) =>
        rolesByUser.includes(rolSingle)
      );
      if (!checkValueRol) {
        throw new Error("user have not permission");
      }
      next();
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  };
