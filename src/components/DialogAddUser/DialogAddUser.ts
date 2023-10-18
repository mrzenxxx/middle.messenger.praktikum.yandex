import template from './DialogAddUser.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
import chatsController from '../../controllers/ChatsController';
import { withStore } from '../../hocs/withStore';

interface DialogAddUserProps {
  isOpen: boolean,
  error: Nullable<string>,
  onSubmit: (event: Event) => void,
  onClose: (event: Event) => void,
}

class DialogAddUserBase extends Block<DialogAddUserProps> {
  constructor(props: DialogAddUserProps) {
    super({
      ...props,
      onSubmit: (event) => {
        event.preventDefault();
        const title = this.refs.chatTitle.value();
        chatsController.create(title!).catch((error) => this.setError(error));
        this.closeDialog();
      },
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      },
    });
  }

  public closeDialog() {
    store.set('isOpenDialogAddUser', false);
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

export const DialogAddUser = withStore((state) => ({ isOpen : state.isOpenDialogAddUser }))(DialogAddUserBase)
