import BaseAPI from './BaseAPI';
import { User, ChangePasswordRequestData } from '../types/interfacesAPI';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user' );
  }

  public updateProfile = (data: User) => this.http.put('/profile', { data });
  
  public updateAvatar = (data: FormData) => this.http.put('/profile/avatar', { data });

  public updatePassword = (data: ChangePasswordRequestData) => this.http.put('/password', { data });

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new UserAPI();
