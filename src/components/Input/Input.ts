import Block from '../../core/Block';
import template from './Input.hbs?raw';
import './Input.scss';

interface InputProps {
    name: string;
    style: string;
    type: string;
    value?: string;
    placeholder?: string;
    className?: string;
    onBlur?: () => void;
    onChange?: () => void;
    onFocus?: () => void;
    onInput?: () => void;
}

export class Input extends Block<InputProps | any> {
  constructor(props: InputProps) {
    super({
      events: {
        blur: props?.onBlur,
        change: props?.onChange,
        focus: props?.onFocus,
        input: props?.onInput,
      },
      name: props.name,
      style: props.style,
      type: props.type,
      value: props.value,
      placeholder: props.placeholder,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
