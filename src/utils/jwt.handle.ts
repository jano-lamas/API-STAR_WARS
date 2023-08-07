import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "1";

export const generateToken = (email: string, type?: string[]) => {

  const jwt = sign({ email, type }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return jwt;
};

export const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
};
