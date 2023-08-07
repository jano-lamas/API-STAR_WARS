import { IAuth } from "../interfaces/auth";
import { IUser } from "../interfaces/user";
import { userModel } from "../bd/models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

class UserModel {
  async registerNewUser(registerUser: IUser) {
    try {
      const checkIs = await userModel.findOne({ email: registerUser.email });
      if (checkIs) throw new Error("user whit email, already exist");
      registerUser.password = await encrypt(registerUser.password);
      const registerNewUSer = await userModel.create(registerUser);

      return registerNewUSer;
    } catch (error: any) {
      throw error.message;
    }
  }

  async loginUser(authUser: IAuth) {
    try {
      const checkIs = await userModel.findOne({ email: authUser.email });
      if (!checkIs) throw new Error("user not found");

      const passwordHash = checkIs.password;
      const isCorrect = await verified(authUser.password, passwordHash);

      if (!isCorrect) throw new Error("password incorrect");

      const token = generateToken(checkIs.email, checkIs.type);
      const data = {
        token,
        user: checkIs,
      };

      return data;
    } catch (error: any) {
      throw error.message;
    }
  }
}

export default new UserModel();
