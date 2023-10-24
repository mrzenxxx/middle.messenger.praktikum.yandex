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
    store.set('error', null);
    try {
      await this.api.login(data);
      await this.getUser();
      router.go(routes.Profile);
    } catch (error) {
      console.error(error);
      store.set('error', error);
    }
  }

  public async register(data : RegisterData) {
    store.set('error', null);
    try {
      await this.api.register(data);
      await this.getUser();
      router.go(routes.Profile);
    } catch (error) {
      console.error(error);
      store.set('error', error);
    }
  }

  public async getUser() {
    const user = await this.api.read();
    store.set('user', transformUserFromApi(user as unknown as User));
  }

  public async logout() {
    try {
      await this.api.logout();
      store.set('user', {});
      router.go(routes.LoginPage);
    } catch (error) {
      store.set('error', error);
    }
  }
}

export default new AuthController();
