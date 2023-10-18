import template from './DialogAddUser.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
import { withStore } from '../../hocs/withStore';

interface DialogAddUserProps {
  isOpen: boolean,
  error: Nullable<string>,
  onClose: (event: Event) => void,
}

class DialogAddUserBase extends Block<DialogAddUserProps> {
  constructor(props: DialogAddUserProps) {
    super({
      ...props,
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      },
    });
  }

  public closeDialog() {
    store.set('isOpenDialogAddUser', false);
  }

  public getUserInput() {
    return this.refs.addUserID.value();
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
