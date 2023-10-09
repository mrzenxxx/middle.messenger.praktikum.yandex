import Block from '../../core/Block';
import { withStore } from '../../hocs/withStore';
import template from './Messenger.hbs?raw';
import './Messenger.scss';
import ChatsController from '../../controllers/ChatsController';


interface MessengerProps extends Record<string, unknown> {
  chats: [],
  currentChat: number,
  user : number,
  messages: [],
};

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({
      ...props,
    });
  }

  protected render(): DocumentFragment {
    ChatsController.getChats();
    return this.compile(template, this.props);
  }
}

export const Messenger = withStore((state)=>({...state.chats, ...state.currentChat, ...state.user }))(MessengerBase);
