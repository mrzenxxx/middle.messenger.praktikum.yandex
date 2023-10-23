import Block from '../../core/Block';
import template from './ChatMessage.hbs?raw';
import './ChatMessage.scss';
import store from '../../core/Store';
import { User } from '../../api/AuthAPI';

interface ChatMessageProps extends StringIndexed {
    isOwn: boolean,
}

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super({
      ...props,
      isOwn: props.author === (store.getState().user as User).id,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
