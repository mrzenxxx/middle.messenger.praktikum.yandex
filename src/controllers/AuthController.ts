import store from '../core/Store';
import API, { AuthAPI, LoginData, RegisterData } from '../api/AuthAPI';
import router from '../core/Router';
import routes from '../core/constants/routes';
import { transformUserFromApi } from '../core/utils/transformers';
import { User } from '../types/interfacesAPI';

class AuthController {
  private readonly api : AuthAPI;

  constructor() {
    this.api = API;
  }

  public async login(data : LoginData) {
    try {
      await this.api.login(data);
      await this.getUser();
      router.go(routes.Profile);
    } catch (error) {
      console.error(error);
    }
  }

  public async register(data : RegisterData) {
    try {
      await this.api.register(data);
      await this.getUser();
      router.go(routes.Profile);
    } catch (error) {
      console.error(error);
    }
  }

  public async getUser() {
    const user : User = await this.api.read();
    store.set('user', transformUserFromApi(user));
  }

  public async logout() {
    await this.api.logout();
    store.set('user', {});
    router.go(routes.Login);
  }
}

export default new AuthController();
