import Block from '../../core/Block';
import template from './Input.hbs?raw';
import './Input.scss';

interface InputProps {
    name: string;
    events: {
        blur?: () => void;
    };
}

export class Input extends Block<InputProps | any> {
  constructor(props: InputProps) {
    super({
      events: {
        blur: props.onBlur,
      },
      name: props?.name,
    });
  }

  render() {
    console.warn('INPUT', this);
    return this.compile(template, this.props);
  }
}
