import Block from '../../utils/Block';
import './Login.scss';
import template from './login.hbs?raw';


type LogInProps = Record<string, unknown>;

export class LogIn extends Block<LogInProps> {
  constructor(props: LogInProps) {
    super({
        ...props,
        title: 'Вход',
        className: 'login',
        primary_label: 'Войти',
        secondary_label: 'Ещё не зарегистрированы?',
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
