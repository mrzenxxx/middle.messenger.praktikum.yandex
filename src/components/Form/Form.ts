import Block from '../../core/Block';
import template from './Form.hbs?raw';
import './Form.scss';

interface FormProps {
    title?: string;
    type?: string;
    customStyle?: string;
    onSubmit: () => void;
}

export class Form extends Block<FormProps | any> {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
