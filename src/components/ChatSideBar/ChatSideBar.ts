import Block from '../../core/Block';
import template from './ChatSideBar.hbs?raw';
import './ChatSideBar.scss';

interface ChatSideBarProps extends Record<string, unknown> {
}

export class ChatSideBar extends Block<ChatSideBarProps> {
  constructor(props: ChatSideBarProps) {
    super({
      ...props,
      chats : [],
  })
}


  render() {
    return this.compile(template, this.props);
  }
}
