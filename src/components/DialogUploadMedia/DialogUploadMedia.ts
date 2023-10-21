import template from './DialogUploadMedia.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
import chatsController from '../../controllers/ChatsController';
import { withStore } from '../../hocs/withStore';

interface DialogUploadMediaProps {
  isOpen: boolean,
  error: Nullable<string>,
  file: File,
  onSubmit: (event: Event) => void,
  onClose: (event: Event) => void,
}

class DialogUploadMediaBase extends Block<DialogUploadMediaProps> {
  constructor(props: DialogUploadMediaProps) {
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
    store.set('isOpenDialogUpload', false);
    store.set('file', null);
  }

  public getFile() {
    return this.refs.fileInput.getFile();
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

export const DialogUploadMedia = withStore((state) => ({ isOpen: state.isOpenDialogUpload }))(DialogUploadMediaBase);
