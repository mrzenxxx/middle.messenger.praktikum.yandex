import Block from '../../core/Block';
import template from './ChatSideBar.hbs?raw';
import './ChatSideBar.scss';

interface ChatSideBarProps extends StringIndexed {
  chats: Object[],
}

export class ChatSideBar extends Block<ChatSideBarProps> {
  constructor(props: ChatSideBarProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
