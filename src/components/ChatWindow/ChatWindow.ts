import './ChatWindow.scss';
import Block from '../../core/Block';
import template from './ChatWindow.hbs?raw';
import { withStore } from '../../hocs/withStore';
import MessagesController from '../../controllers/MessagesController';
import { Chat, User } from '../../types/interfacesAPI';
import { State } from '../../core/Store';

interface ChatWindowProps extends StringIndexed {
  id: number,
  currentChat: Chat;
  title: string,
  value: string,
  error: Nullable<string>,
  placeholder: string,
  onSend: (event: Event) => void;
}

export class ChatWindowBase extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({
      ...props,
      onSend: (event: Event) => {
        event.preventDefault();
        const chatId = props.currentChat.id;
        const message = this.refs.messageBar.value()!;
        MessagesController.postMessage(chatId, message);
        this.refs.messageBar.setProps({
          ...props,
          value: '',
          error: null,
          placeholder: 'Введите сообщение...',
        });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withСurrentChatMessages = withStore((state) => {
  const currentChatId = (state.currentChat as Chat)?.id || null;

  if (!currentChatId) {
    return {
      messages: [],
      currentChat: null,
      userId: (state.user as User)?.id || null,
    };
  }

  return {
    messages: (state.messages || {})[currentChatId] || [],
    currentChat: state.currentChat,
    userId: (state.user as User)?.id || null,
  };
});

export const ChatWindow = withСurrentChatMessages(ChatWindowBase);
