import Block from '../../core/Block';
import template from './ChatMessage.hbs?raw';
import './ChatMessage.scss';

interface ChatMessageProps extends StringIndexed {
    isOwn: boolean,
}

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
