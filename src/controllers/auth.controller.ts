import { AuthDTO, AuthResponseDTO } from "../common/dtos/auth.dto";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static login = async ({ username, password }: AuthDTO) => {
    const res = new AuthResponseDTO();
    res.data = await AuthService.login(username, password);
    res.success = true;
    res.message = "Login successful";

    return res;
  };
  static register = async ({ username, password }: AuthDTO) => {
    const res = new AuthResponseDTO();
    res.data = await AuthService.register(username, password);
    res.message = "User registration successful";

    return res;
  };
}
