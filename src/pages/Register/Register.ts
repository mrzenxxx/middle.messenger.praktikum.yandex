import Block from '../../core/Block';
import './Register.scss';
import template from './register.hbs?raw';
import Router from '../../core/Router';
import AuthController from '../../controllers/AuthController';
import { RegisterData } from '../../api/AuthAPI';
import routes from '../../core/constants/routes';

type RegisterProps = Record<string, unknown>;

export class Register extends Block<RegisterProps> {
  constructor(props: RegisterProps) {
    super({
      ...props,

      onRegister: (event : Event) => {
        event.preventDefault();
        const form: { [key: string]: string } = {};
        const keys = Object.keys(this.refs);
        keys!.forEach((key) => {
          form[key] = this.refs[key].value()!;
        });
        AuthController.register(form as RegisterData);
      },

      onSwitch: (event : Event) => {
        event.preventDefault();
        Router.go(routes.Login);
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
