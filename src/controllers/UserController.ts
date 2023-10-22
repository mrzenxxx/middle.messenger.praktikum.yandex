import API, { UserAPI } from '../api/UserApi';
import { User, ChangePasswordRequestData } from '../types/interfacesAPI';

class UserController {
  private readonly api : UserAPI;

  constructor() {
    this.api = API;
  }

  public updateProfile = (data: User) => this.api.updateProfile(data);

  public updateAvatar = (data: FormData) => this.api.updateAvatar(data);

  public updatePassword = (data: ChangePasswordRequestData) => this.api.updatePassword(data);
}

export default new UserController();
