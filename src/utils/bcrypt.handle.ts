import { hash, compare } from "bcryptjs";

export const encrypt = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

export const verified = async (password: string, passHash: string) => {
  const isCorrect = await compare(password, passHash);
  return isCorrect;
};
