import Block from '../../core/Block';
import template from './ChatFeed.hbs?raw';
import './ChatFeed.scss';

interface ChatFeedProps {
  currentChat: number,
  messages: object[];
}

export class ChatFeed extends Block<ChatFeedProps> {
  constructor(props: ChatFeedProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
