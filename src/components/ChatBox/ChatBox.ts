import Block from '../../core/Block';
import template from './ChatBox.hbs?raw';
import './ChatBox.scss';
import store from '../../core/Store';
import { Chat } from '../../types/interfacesAPI';

interface ChatBoxProps extends Chat{
    chat: StringIndexed;
    isActive: boolean,
    events: { click : () => void };
}

export class ChatBox extends Block<ChatBoxProps> {
  constructor(props: ChatBoxProps) {
    super({
      ...props,
      isActive: props.id === store.getState().currentChat?.id,
      events: {
        click: () => {
          this.onSelect();
        },
      },
    });
  }

  protected onSelect() {
    store.set('currentChat', this.props.chat);
    this.props.isActive = true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
