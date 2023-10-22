import './Messenger.scss';
import Block from '../../core/Block';
import template from './Messenger.hbs?raw';
import ChatsController from '../../controllers/ChatsController';
import AuthController from '../../controllers/AuthController';
import { withStore } from '../../hocs/withStore';
import { Chat } from '../../types/interfacesAPI';

interface MessengerProps extends StringIndexed {
  chats: Nullable<StringIndexed>,
  currentChat: Chat,
  user : number,
  messages: [],
  getUserInput: () => string,
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({
      ...props,
      onAddUser: () => {
        const userId = this.refs.addUserDialog.getUserInput();
        const chatId = this.props.currentChat?.id;
        ChatsController.addUserToChat(chatId, userId as unknown as number);
      },
      onRemoveUser: () => {
        const userId = this.refs.removeUserDialog.getUserInput();
        const chatId = this.props.currentChat?.id;
        ChatsController.removeUserFromChat(chatId, userId as unknown as number);
      },
      onCreateChat: () => {
        const title = this.refs.createChatDialog.getChatTitle();
        ChatsController.create(title!);
      },
      onDeleteChat: () => {
        const chatId = this.props.currentChat.id;
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
