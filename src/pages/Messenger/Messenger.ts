import Block from '../../core/Block';
import { withStore } from '../../hocs/withStore';
import template from './Messenger.hbs?raw';
import './Messenger.scss';
import ChatsController from '../../controllers/ChatsController';
import AuthController from '../../controllers/AuthController';
import Store from '../../core/Store';

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
      // onCreateChat: (event) => {
      //   event.preventDefault();
      //   const title = this.refs.chatTitle.value();
      //   chatsController.create(title!).catch((error) => this.setError(error));
      //   this.closeDialog();
      // },
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
