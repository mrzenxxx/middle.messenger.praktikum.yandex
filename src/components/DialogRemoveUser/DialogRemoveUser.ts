import template from './DialogRemoveUser.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
import { withStore } from '../../hocs/withStore';

interface DialogRemoveUserProps extends StringIndexed {
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
        store.set('error', null);
        this.closeDialog();
      },
    });
  }

  public closeDialog() {
    store.nullifyError();
    store.set('isOpenDialogRemoveUser', false);
  }

  public getUserInput() {
    return this.refs.removeUserID.value();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const DialogRemoveUser = withStore((state) => ({ isOpen: state.isOpenDialogRemoveUser }))(DialogRemoveUserBase);
