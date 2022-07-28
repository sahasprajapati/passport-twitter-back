import { User } from "../schema/user.schema";

import { AuthResponse } from "../common/dtos/auth.dto";
import {
  comparePassword,
  hashPassword,
  tokenify,
} from "../common/utils/auth.util";

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const user = await User.findOne({
      email: email,
    })
      .exec()
      .catch(() => {
        throw new Error("User not found");
      });
    if (!user || !comparePassword(password, user.password as string)) {
      throw new Error("Invalid email or password");
    } else {
      return {
        email: user.email,
        token: tokenify(user.id, user.email),
      };
    }
  };

  static register = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const newUser = new User({ email: email });
    newUser.password = await hashPassword(password);
    const res = await newUser.save().catch(() => {
      throw new Error("Error while creating user. User already exist");
    });

    return {
      email: newUser.email,
      token: tokenify(res.id, res.email),
    };
  };

  static checkUser = async (email: string): Promise<boolean> => {
    const user = await User.findOne({
      email: email,
    }).exec();

    return !!user;
  };

  static passwordlessLogin = async (email: string): Promise<AuthResponse> => {
    const user = await User.findOne({
      email: email,
    })
      .exec()
      .catch(() => {
        throw new Error("User not found");
      });
    if (!user) {
      throw new Error("Invalid email");
    } else {
      return {
        email: user.email,
        token: tokenify(user.id, user.email),
      };
    }
  };
}
