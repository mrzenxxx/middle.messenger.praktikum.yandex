import template from './DialogCreateChat.hbs?raw';
import Block from "../../core/Block";
import "./DialogCreateChat.scss";
import store from '../../core/Store';

interface DialogProps {
    isOpen: boolean,
    error: Nullable<string>,
    onClose: () => void;
}

export class DialogCreateChat extends Block<DialogProps> {
    constructor(props: DialogProps) {
        super({
          ...props,
          onClose: ()=> {
            store.set('isOpenDialogChat', false);
          }  
        });
      }

      public getChatTitle() {
        return this.refs.chatTitle.value();
    }
    
    public setError(error: string) {
        this.refs.errorLine.setProps({
            ...this.props,
            error,
        })
    }
    
      render() {
        return this.compile(template, this.props);
      }
}
