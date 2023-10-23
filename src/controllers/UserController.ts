import API, { UserAPI } from '../api/UserAPI';
import { User, ChangePasswordRequestData } from '../types/interfacesAPI';
import store from '../core/Store';

class UserController {
  private readonly api : UserAPI;

  constructor() {
    this.api = API;
  }

  public updateProfile = (data: User) => this.api.updateProfile(data);

  public updateAvatar = (data: FormData) => this.api.updateAvatar(data).catch(error => store.set('error', error));

  public updatePassword = (data: ChangePasswordRequestData) => this.api.updatePassword(data).catch(error => store.set('error', error));
}

export default new UserController();
