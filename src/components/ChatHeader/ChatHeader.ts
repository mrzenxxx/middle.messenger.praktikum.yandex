import Block from '../../core/Block';
import store from '../../core/Store';
import template from './ChatHeader.hbs?raw';
import './ChatHeader.scss';

interface ChatHeaderProps {
  title: string,
  onAddUser: () => void,
  onDeleteChat: () => void,
}

export class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      onAddUser: () => {
        store.set('isOpenDialogAddUser', true);
      },
      onDeleteChat: () => {
        store.set('isOpenDialogDelete', true);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
