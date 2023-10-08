import Block from '../../core/Block';
import template from './Messenger.hbs?raw';
import './Messenger.scss';

import { chats, messages } from '../../../assets/mocks';

type MessengerProps = Record<string, unknown>;

export class Messenger extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({
      ...props,
      chats,
      messages,

    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
