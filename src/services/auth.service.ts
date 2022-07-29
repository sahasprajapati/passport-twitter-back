import { User } from "../schema/user.schema";

import { AuthResponse } from "../common/dtos/auth.dto";
import {
  comparePassword,
  hashPassword,
  tokenify,
} from "../common/utils/auth.util";

export class AuthService {
  static login = async (
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    const user = await User.findOne({
      username: username,
    })
      .exec()
      .catch(() => {
        throw new Error("User not found");
      });
    if (!user || !comparePassword(password, user.password as string)) {
      throw new Error("Invalid username or password");
    } else {
      return {
        username: user.username,
        token: tokenify(user.id, user.username),
      };
    }
  };

  static register = async (
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    const newUser = new User({ username: username });
    newUser.password = await hashPassword(password);

    const res = await newUser.save().catch(() => {
      throw new Error("Error while creating user. User already exist");
    });

    return {
      username: newUser.username,
      token: tokenify(res.id, res.username),
    };
  };

  static checkUser = async (username: string): Promise<boolean> => {
    const user = await User.findOne({
      username: username,
    }).exec();

    return !!user;
  };

  static passwordlessLogin = async (
    username: string
  ): Promise<AuthResponse> => {
    const user = await User.findOne({
      username: username,
    })
      .exec()
      .catch(() => {
        throw new Error("User not found");
      });
    if (!user) {
      throw new Error("Invalid username");
    } else {
      return {
        username: user.username,
        token: tokenify(user.id, user.username),
      };
    }
  };
}
