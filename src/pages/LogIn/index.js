import Handlebars from 'handlebars';
import './Login.scss';
import { template } from './login.tmpl';

export const LogIn = () => Handlebars.compile(template)({
  title: 'Вход',
  className: 'login',
  primary_label: 'Войти',
  secondary_label: 'Ещё не зарегистрированы?',
});
