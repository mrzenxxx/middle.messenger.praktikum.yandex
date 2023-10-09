import store from '../core/Store';
import API, { AuthAPI, LoginData, RegisterData } from '../api/AuthAPI';
import router from '../core/Router';
import { Routes } from '../core/constants/routes';

class AuthController {
  private readonly api : AuthAPI;

  constructor() {
    this.api = API;
  }

  public async login(data : LoginData) {
    try {
      await this.api.login(data);
      await this.getUser();
      router.go(Routes.Profile);
    } catch (error) {
      console.error(error);
    }
  }

  public async register(data : RegisterData) {
    try {
      await this.api.register(data);
      await this.getUser();
      router.go(Routes.Profile);
    } catch (error) {
      console.error(error);
    }
  }

  public async getUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  public async logout() {
    await this.api.logout();
    store.set('user', {});
    router.go(Routes.Login);
  }
}

export default new AuthController();