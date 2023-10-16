import Block from '../../core/Block';
import template from './ChatWindow.hbs?raw';
import { withStore } from '../../hocs/withStore';
import './ChatWindow.scss';
import MessagesController from '../../controllers/MessagesController';

interface ChatWindowProps {
  id: number,
  currentChat: object;
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
        const chatId = props.currentChat.id||null;
        const message = this.refs.messageBar.value()!;
        MessagesController.postMessage(chatId, message);
        this.refs.messageBar.setProps({
          ...props,
          value: '',
          error: null,
          placeholder: 'Введите сообщение...',
        });
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withСurrentChatMessages = withStore((state) => {
  const currentChatId = state.currentChat?.id||null;

  if (!currentChatId) {
    return {
      messages: [],
      currentChat: undefined,
      userId: state.user?.id||undefined
    };
  }

  return {
    messages: (state.messages || {})[currentChatId] || [],
    currentChat: state.currentChat,
    userId: state.user.id
  };
});

export const ChatWindow = withСurrentChatMessages(ChatWindowBase);
