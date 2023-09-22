import Block from '../../core/Block';
import template from './main.hbs?raw';
import './Main.scss';

type MainProps = Record<string, unknown>;

export class Main extends Block<MainProps> {
  constructor(props: MainProps) {
    super({
        ...props,
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
