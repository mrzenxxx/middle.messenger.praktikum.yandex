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
          open: true,
          onClose: ()=> {
            this.setProps({
                ...this.props,
                open: false,
            })
          }  
        });
      }
    
      render() {
        return this.compile(template, this.props);
      }
}
