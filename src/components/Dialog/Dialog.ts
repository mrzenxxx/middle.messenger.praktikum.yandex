import template from './Dialog.hbs?raw';
import Block from "../../core/Block";
import "./Dialog.scss";

interface DialogProps {
    open: boolean,
    onClose: () => void;
}

export class Dialog extends Block<DialogProps> {
    constructor(props: DialogProps) {
        super({
          ...props,
          onClose: ()=> {
            this.setProps({
                ...this.props,
            })
          }  
        });
      }
    
      render() {
        return this.compile(template, this.props);
      }
}
