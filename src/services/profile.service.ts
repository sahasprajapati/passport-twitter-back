import { ProfileResponse } from "../common/dtos/profile.dto";
import { User } from "../schema/user.schema";

export class ProfileService {
  static profile = async (id: string): Promise<ProfileResponse> => {
    console.log("Id", id);
    const user = await User.findOne({
      _id: id,
    }).exec();
    return {
      id: user?.id,
      email: user?.email as string,
    };
  };
}
