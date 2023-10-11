import Block from '../../core/Block';
import template from './ChatBox.hbs?raw';
import './ChatBox.scss';
import store from '../../core/Store';
import { Chat } from '../../types/interfacesAPI';

interface ChatBoxProps extends Chat{
    isActive: boolean,
    events: { click : () => void };
}

export class ChatBox extends Block<ChatBoxProps> {
  constructor(props: ChatBoxProps) {
    super({
      ...props,
      events: {
        click: () => {
          this.onSelect();
        },
      },
    });
  }

  protected onSelect() {
    store.set('activeChat', this.props.id);
    this.props.isActive = this.props.id === store.getState().activeChat;
    console.log('Click!!!', this, this.props.isActive);
  }

  render() {
    return this.compile(template, this.props);
  }
}
