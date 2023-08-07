import { Schema, Types, model, Model } from "mongoose";
import { IUser } from "../../interfaces/user";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: [{ type: String, enum: ["Usuarios Regulares", "Administrador"] }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = model("User", UserSchema);
