import { Response } from "./response.dto";

export interface ProfileResponse {
  id: string;
  email: string;
}

export class ProfileResponseDTO extends Response<ProfileResponse> {
  data?: ProfileResponse;
}
