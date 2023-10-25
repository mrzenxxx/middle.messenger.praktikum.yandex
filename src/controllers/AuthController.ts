import store from '../core/Store';
import API, { AuthAPI, LoginData, RegisterData } from '../api/AuthAPI';
import router from '../core/Router';
import routes from '../core/constants/routes';
import { transformUserFromApi } from '../core/utils/transformers';
import { User } from '../types/interfacesAPI';
import { redirectErrors } from '../core/constants/redirectErrors';

class AuthController {
  private readonly api : AuthAPI;

  constructor() {
    this.api = API;
  }

  public async login(data : LoginData) {
    store.nullifyError();
    try {
      await this.api.login(data);
      await this.getUser();
      router.go(routes.Profile);
    } catch (error) {
      console.error(error);
      if (String(error) === redirectErrors.ALREADY_IN_SYSTEM) {
        router.go(routes.Messenger);
      } else {
        store.set('error', error);
      }
    }
  }

  public async register(data : RegisterData) {
    store.nullifyError();
    try {
      await this.api.register(data);
      await this.getUser();
      router.go(routes.Profile);
    } catch (error) {
      console.error(error);
      store.nullifyError();
      store.set('error', error);
    }
  }

  public async getUser() {
    store.nullifyError();
    try {
      const user = await this.api.read();
      store.set('user', transformUserFromApi(user as unknown as User));
    } catch (error) {
      console.error(error);
      store.set('error', error);
    }
  }

  public async logout() {
    store.nullifyError();
    try {
      await this.api.logout();
      store.set('user', {});
      router.go(routes.LoginPage);
    } catch (error) {
      console.error(error);
      if (String(error) === redirectErrors.BAD_USER_COOKIE) {
        router.go(routes.LoginPage);
      } else {
        store.set('error', error);
      }
    }
  }
}

export default new AuthController();
