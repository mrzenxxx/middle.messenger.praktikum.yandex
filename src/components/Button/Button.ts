import Block from "../../utils/Block";
import template from "./button.hbs?raw";
import './Button.scss';

interface ButtonProps {
    label: string;
    type: string,
    onClick?: () => void;
    events: {
      click?: () => void;
      submit?: () => void;
    };
  }
  
  export class Button extends Block<ButtonProps|any> {
    constructor(props: ButtonProps) {
      super({
        ...props,
        events: {
          click: props?.onClick
        }
      });
    }
  
    render() {
      console.log('button rendered', this);
      return this.compile(template, this.props);
    }
  }