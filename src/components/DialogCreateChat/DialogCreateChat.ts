import template from './DialogCreateChat.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
import { withStore } from '../../hocs/withStore';

interface DialogCreateChatProps {
  isOpen: boolean,
  error: Nullable<string>,
  onSubmit: (event: Event) => void,
  onClose: (event: Event) => void,
}

export class DialogCreateChatBase extends Block<DialogCreateChatProps> {
  constructor(props: DialogCreateChatProps, state: State) {
    super({
      ...props,
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      },
    });
  }

  public closeDialog() {
    store.set('isOpenDialogChat', false);
  }

  public getChatTitle() {
    return this.refs.chatTitle.value();
  }

  // TODO Не работает, выкидывает ошибку только в консоли
  public setError(error: string) {
    this.refs.errorLine.setProps({
      ...this.refs.errorLine.props,
      error,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const DialogCreateChat = withStore((state) => ({ isOpen: state.isOpenDialogChat }))(DialogCreateChatBase);
