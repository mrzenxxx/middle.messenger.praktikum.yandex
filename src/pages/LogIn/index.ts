import Block from '../../core/Block';
import template from './login.hbs?raw';
import './Login.scss';

type LogInProps = Record<string, unknown>;

export class LogIn extends Block<LogInProps> {
  constructor(props: LogInProps) {
    super({
        ...props,
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
