import Block from '../../core/Block';
import template from './button.hbs?raw';
import './Button.scss';

interface ButtonProps {
    label: string;
    type: string,
    style?: string,
    className?: string,
    onClick?: () => void;
  }

export class Button extends Block<ButtonProps|any> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props?.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
