import Block from '../../core/Block';
import template from './login.hbs?raw';
import './Login.scss';

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

    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
