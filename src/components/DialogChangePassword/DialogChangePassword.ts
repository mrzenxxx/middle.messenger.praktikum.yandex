import template from './DialogChangePassword.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
import { withStore } from '../../hocs/withStore';

interface DialogChangePasswordProps {
  isOpen: boolean,
  error: Nullable<string>,
  onSubmit: (event: Event) => void,
  onClose: (event: Event) => void,
  onChange: () => void,
}

class DialogChangePasswordBase extends Block<DialogChangePasswordProps> {
  constructor(props: DialogChangePasswordProps) {
    super({
      ...props,
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      },
      onChange: () => this.compareEntries(),
    });
  }

  public closeDialog() {
    store.set('isOpenDialogPassword', false);
  }

  public compareEntries() {
    const newPassword = this.refs.newPassword.value();
    const newPasswordConfirm = this.refs.newPasswordConfirm.value();
    console.log({newPassword, newPasswordConfirm}, this, this.refs, this.refs.errorMessage);
    if ( newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
      this.refs.errorMessage.setProps({
        ...this.props,
        error: 'Пароли не совпадают',
      }); 
    } else {
      this.refs.errorMessage.setProps({
        ...this.props,
        error: null,
      });
    }
  }

  public getPasswords() {
    const oldPassword = this.refs.oldPassword.value();
    const newPassword = this.refs.newPassword.value();

    return {
      oldPassword,
      newPassword,
    }

  }

  render() {
    return this.compile(template, this.props);
  }
}

export const DialogChangePassword = withStore((state) => ({ isOpen: state.isOpenDialogPassword }))(DialogChangePasswordBase);
