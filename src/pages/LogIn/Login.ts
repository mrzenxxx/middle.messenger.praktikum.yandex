import Block from '../../core/Block';
import template from './login.hbs?raw';
import './Login.scss';
import router from '../../core/Router';
import AuthController from '../../controllers/AuthController';
import { Routes } from '../../core/constants/routes';

type LogInProps = Record<string, unknown>;

export class LogIn extends Block<LogInProps> {
  constructor(props: LogInProps) {
    super({
      ...props,

      onLogin: (event : Event) => {
        event.preventDefault();
        const login = this.refs.login.value()!;
        const password = this.refs.password.value()!;

        console.table({
          login,
          password,
        });

        AuthController.login({
          login,
          password,
        });
      },

      onSwitch: (event : Event) => {
        event.preventDefault();
        router.go(Routes.Register);
      }

    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
