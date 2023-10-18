import template from './DialogChangePassword.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
import { withStore } from '../../hocs/withStore';

interface DialogChangePasswordProps {
  isOpen: boolean,
  error: Nullable<string>,
  onSubmit: (event: Event) => void,
  onClose: (event: Event) => void,
}

class DialogChangePasswordBase extends Block<DialogChangePasswordProps> {
  constructor(props: DialogChangePasswordProps) {
    super({
      ...props,
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      },
    });
  }

  public closeDialog() {
    store.set('isOpenDialogPassword', false);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const DialogChangePassword = withStore((state) => ({ isOpen: state.isOpenDialogPassword }))(DialogChangePasswordBase);
