import Block from '../../core/Block';
import { withStore } from '../../hocs/withStore';
import template from './Messenger.hbs?raw';
import './Messenger.scss';
import ChatsController from '../../controllers/ChatsController';


interface MessengerProps extends Record<string, unknown> {
  chats: Nullable<StringIndexed>,
  currentChat: number,
  user : number,
  messages: [],
  isOpenDialogChat : boolean,
};

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({
      ...props,
    });
    ChatsController.getChats();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}


export const Messenger = withStore((state)=>({...state}))(MessengerBase);
