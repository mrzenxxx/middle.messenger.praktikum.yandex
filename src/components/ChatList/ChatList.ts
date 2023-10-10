import Block from '../../core/Block';
import template from './ChatList.hbs?raw';
import './ChatList.scss';

interface ChatListProps extends StringIndexed {};

export default class ChatList extends Block<ChatListProps> {
    constructor(props: ChatListProps) {
      super({
        ...props,
    })
  }
    render() {
      return this.compile(template, this.props);
    }
  }
  