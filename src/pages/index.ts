import { Messenger } from './Messenger/Messenger';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import { Profile } from './Profile/Profile';
import { NotFound } from './NotFound/NotFound';
import { ServerError } from './ServerError/ServerError';
import { Navigation } from './Navigation/Navigation';

const pages : StringIndexed = {
  Login,
  Messenger,
  NotFound,
  Navigation,
  Profile,
  Register,
  ServerError,
};

export default pages;
