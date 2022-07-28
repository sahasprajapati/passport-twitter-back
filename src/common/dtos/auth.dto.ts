import { Response } from "./response.dto";

interface Auth {
  email: string;
}
export interface AuthDTO extends Auth {
  password: string;
}

export interface AuthResponse extends Auth {
  token: string;
}
export class AuthResponseDTO extends Response<AuthResponse> {
  data?: AuthResponse;
}
