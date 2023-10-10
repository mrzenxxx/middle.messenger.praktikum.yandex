import template from './DialogCreateChat.hbs?raw';
import Block from "../../core/Block";
import "./DialogCreateChat.scss";
import store from '../../core/Store';
import chatsController from '../../controllers/ChatsController';

interface DialogProps {
  isOpen: boolean,
  error: Nullable<string>,
  onSubmit: (event: Event) => void,
  onClose: (event: Event) => void,
}

export class DialogCreateChat extends Block<DialogProps> {
  constructor(props: DialogProps) {
    super({
      ...props,
      onSubmit: (event) => {
        event.preventDefault();
        const title = this.refs.chatTitle.value();
        console.log('#title:',title)
        chatsController.create(title);
        this.closeDialog();
      },
      onClose: (event) => {
        event.preventDefault();
        this.closeDialog();
      }
  });
}

  public closeDialog() {
  store.set('isOpenDialogChat', false);
}

  public getChatTitle() {
  return this.refs.chatTitle.value();
}

  public setError(error: string) {
  this.refs.errorLine.setProps({
    ...this.refs.errorLine.props,
    error,
  })
}

render() {
  return this.compile(template, this.props);
}
}
