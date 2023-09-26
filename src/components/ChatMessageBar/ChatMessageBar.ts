import Block from '../../core/Block';
import template from './ChatMessageBar.hbs?raw';
import './ChatMessageBar.scss';

interface ChatMessageBarProps {
    placeholder: string;
    style: string;
    onBlur: () => void;
    onSend: () => void;
    onAttach: () => void;
}

export class ChatMessageBar extends Block<ChatMessageBarProps | any> {
  constructor(props: ChatMessageBarProps) {
    super({
      ...props,
      // TODO не получается передать строку с пробелом
      placeholder: 'Введите сообщение...',
      onSend: () => console.info('send!'),
      events: {
        blur: props?.onSend,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
