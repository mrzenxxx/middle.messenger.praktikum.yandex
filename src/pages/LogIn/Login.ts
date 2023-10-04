import Block from '../../core/Block';
import template from './login.hbs?raw';
import './Login.scss';
import Router from '../../core/Router';

type LogInProps = Record<string, unknown>;

export class LogIn extends Block<LogInProps> {
  constructor(props: LogInProps) {
    super({
      ...props,

      onLogin: (event : Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();

        console.table({
          login,
          password,
        });
      },

      onSwitch: (event : Event) => {
        event.preventDefault();
        Router.go('/register');
      }

    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
