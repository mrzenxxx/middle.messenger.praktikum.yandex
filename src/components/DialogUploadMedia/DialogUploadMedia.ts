import template from './DialogUploadMedia.hbs?raw';
import Block from '../../core/Block';
import store from '../../core/Store';
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
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      },
    });
  }

  public closeDialog() {
    store.set('error', null);
    store.set('isOpenDialogUpload', false);
    store.set('file', null);
  }

  public getFile() {
    return this.refs.fileInput.getFile();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const DialogUploadMedia = withStore((state) => ({ isOpen: state.isOpenDialogUpload }))(DialogUploadMediaBase);
