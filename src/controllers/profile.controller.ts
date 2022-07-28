import { ProfileResponseDTO } from "../common/dtos/profile.dto";
import { ProfileService } from "../services/profile.service";

export class ProfileController {
  static profile = async (id: string) => {
    const res = new ProfileResponseDTO();
    res.data = await ProfileService.profile(id);
    res.message = "User fetched successfully";

    return res;
  };
}
