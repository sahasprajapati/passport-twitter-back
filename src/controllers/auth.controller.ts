import {
  AuthDTO,
  AuthResponseDTO,
  ProfileResponseDTO,
} from "../common/dtos/auth.dto";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static login = async ({ email, password }: AuthDTO) => {
    const res = new AuthResponseDTO();
    res.data = await AuthService.login(email, password);
    res.success = true;
    res.message = "Login successful";

    return res;
  };
  static register = async ({ email, password }: AuthDTO) => {
    const res = new AuthResponseDTO();
    res.data = await AuthService.register(email, password);
    res.message = "User registration successful";

    return res;
  };

  static profile = async (id: string) => {
    const res = new ProfileResponseDTO();
    res.data = await AuthService.profile(id);
    res.message = "User fetched successfully";

    return res;
  };
}
