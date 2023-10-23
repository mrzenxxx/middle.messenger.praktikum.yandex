import Block from '../../core/Block';
import store from '../../core/Store';
import template from './ChatHeader.hbs?raw';
import './ChatHeader.scss';

interface ChatHeaderProps extends StringIndexed {
  title: string,
  onAddUser: () => void,
  onDeleteChat: () => void,
  onRemoveUser: () => void,
}

export class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      onAddUser: () => {
        store.nullifyError(),
        store.set('isOpenDialogAddUser', true);
      },
      onDeleteChat: () => {
        store.nullifyError(),
        store.set('isOpenDialogDelete', true);
      },
      onRemoveUser: () => {
        store.nullifyError(),
        store.set('isOpenDialogRemoveUser', true);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
