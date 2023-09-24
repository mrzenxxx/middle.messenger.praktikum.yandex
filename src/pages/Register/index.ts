import Block from '../../core/Block';
import './Register.scss';
import template from './register.hbs?raw';

type RegisterProps = Record<string, unknown>;

export class Register extends Block<RegisterProps> {
  constructor(props: RegisterProps) {
    super({
        ...props,
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
