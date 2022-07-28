import { AuthDTO, AuthResponseDTO } from "../common/dtos/auth.dto";
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
}
