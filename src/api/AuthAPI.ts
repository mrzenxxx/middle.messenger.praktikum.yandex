import BaseAPI from './BaseAPI';

export type LoginData = {
    login: string;
    password: string;
}

export type RegisterData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export type User = {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public login = (data : LoginData) => this.http.post('/signin', { data });

  public register = (data : RegisterData) => this.http.post('/signup', { data });

  public read = () => this.http.get('/user');

  public logout = () => this.http.post('/logout');

  update = undefined;

  create = undefined;

  delete = undefined;
}

export default new AuthAPI();
