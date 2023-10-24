import { Messenger } from './Messenger/Messenger';
import { LoginPage } from './LoginPage/LoginPage';
import { Register } from './Register/Register';
import { Profile } from './Profile/Profile';
import { NotFound } from './NotFound/NotFound';
import { ServerError } from './ServerError/ServerError';
import { Navigation } from './Navigation/Navigation';

const pages : StringIndexed = {
  LoginPage,
  Messenger,
  NotFound,
  Navigation,
  Profile,
  Register,
  ServerError,
};

export default pages;
