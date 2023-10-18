import template from './DialogRemoveUser.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
import { withStore } from '../../hocs/withStore';

interface DialogRemoveUserProps {
  isOpen: boolean,
  error: Nullable<string>,
  onClose: (event: Event) => void,
}

class DialogRemoveUserBase extends Block<DialogRemoveUserProps> {
  constructor(props: DialogRemoveUserProps) {
    super({
      ...props,
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      },
    });
  }

  public closeDialog() {
    store.set('isOpenDialogRemoveUser', false);
  }

  public getUserInput() {
    return this.refs.removeUserID.value();
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

export const DialogRemoveUser = withStore((state) => ({ isOpen: state.isOpenDialogRemoveUser }))(DialogRemoveUserBase);
