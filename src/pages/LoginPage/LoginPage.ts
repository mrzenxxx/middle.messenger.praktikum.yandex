import Block from '../../core/Block';
import template from './LoginPage.hbs?raw';
import './LoginPage.scss';
import router from '../../core/Router';
import AuthController from '../../controllers/AuthController';
import routes from '../../core/constants/routes';

interface LoginPageProps extends StringIndexed{
  error: string,
  onLogin: (event: Event) => void;
  onSwitch: (event: Event) => void;
}

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super({
      ...props,

      onLogin: (event : Event) => {
        event.preventDefault();
        const login = this.refs.login.value()!;
        const password = this.refs.password.value()!;
        AuthController.login({
          login,
          password,
        });
      },

      onSwitch: (event : Event) => {
        event.preventDefault();
        router.go(routes.Register);
      },

    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
