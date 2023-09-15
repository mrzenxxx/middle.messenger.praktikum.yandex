import Block from '../../utils/Block';
import './Register.scss';
import template from './register.hbs?raw';

type RegisterProps = Record<string, unknown>;

export class Register extends Block<RegisterProps> {
  constructor(props: RegisterProps) {
    super({
        ...props,
        className: 'register',
        title: 'Регистрация',
        primary_label: 'Зарегистрироваться',
        secondary_label: 'Уже есть аккаунт?',
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
