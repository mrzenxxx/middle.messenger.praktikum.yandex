import Block from '../../core/Block';
import './Register.scss';
import template from './register.hbs?raw';
import Router from '../../core/Router';

type RegisterProps = Record<string, unknown>;

export class Register extends Block<RegisterProps> {
  constructor(props: RegisterProps) {
    super({
      ...props,

      onRegister: (event : Event) => {
        event.preventDefault();
        const form: Record<string, string | null> = {};
        const keys = Object.keys(this.refs);
        keys.forEach((key) => {
          form[key] = this.refs[key].value();
        });
        console.table(form);
      },

      onSwitch: (event : Event) => {
        event.preventDefault();
        Router.go('/login');
      }
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
