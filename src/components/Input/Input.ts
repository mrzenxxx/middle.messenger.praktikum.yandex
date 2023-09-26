import Block from '../../core/Block';
import template from './Input.hbs?raw';
import './Input.scss';

interface InputProps {
    name: string;
    style: string;
    type: string;
    value: string;
    onBlur?: () => void;
}

export class Input extends Block<InputProps | any> {
  constructor(props: InputProps) {
    super({
      events: {
        blur: props.onBlur,
      },
      name: props.name,
      style: props.style,
      type: props.type,
      value: props.value,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
