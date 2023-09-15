import Block from '../../utils/Block';
import template from './main.hbs?raw';
import './Main.scss';

type MainProps = Record<string, unknown>;

export class Main extends Block<MainProps> {
  constructor(props: MainProps) {
    super({
        ...props,
        className: 'main-page',
        chatName: 'Заглушка списка чатов',
        chatMessage: 'Заглушка окна чата',
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
