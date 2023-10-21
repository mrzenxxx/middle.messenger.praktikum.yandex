import BaseAPI from './BaseAPI';
import { User } from '../types/interfacesAPI';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user' );
  }

  public updateProfile = (data: User) => this.http.put('/profile', { data });
  
  public updateAvatar = (data: FormData) => this.http.put('/profile/avatar', { data });

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new UserAPI();
