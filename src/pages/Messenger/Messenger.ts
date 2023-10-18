import Block from '../../core/Block';
import { withStore } from '../../hocs/withStore';
import template from './Messenger.hbs?raw';
import './Messenger.scss';
import ChatsController from '../../controllers/ChatsController';
import AuthController from '../../controllers/AuthController';

interface MessengerProps extends Record<string, unknown> {
  chats: Nullable<StringIndexed>,
  currentChat: number,
  user : number,
  messages: [],
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({
      ...props,
      onAddUser: () => {
        const userLogin = this.refs.addUserDialog.getUserInput();
        const chatId = this.props.currentChat?.id;
        ChatsController.addUserToChat(chatId, userLogin);
      },
      onRemoveUser: () => {
        const userLogin = this.refs.removeUserDialog.getUserInput();
        const chatId = this.props.currentChat?.id;
        ChatsController.removeUserFromChat(chatId, userLogin);
      },
      onCreateChat: () => {
        const title = this.refs.createChatDialog.getChatTitle();
        ChatsController.create(title!);
      },
      onDeleteChat: () => {
        const chatId = this.props.currentChat?.id;
        ChatsController.delete(chatId);
      },
    });
    ChatsController.getChats();
    AuthController.getUser();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const Messenger = withStore((state) => ({ ...state }))(MessengerBase);
