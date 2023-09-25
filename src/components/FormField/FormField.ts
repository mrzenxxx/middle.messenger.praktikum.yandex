import Block from '../../core/Block';
import template from './FormField.hbs?raw';
import './FormField.scss';
import { VALIDATION_RULES, VALIDATION_ERRORS } from '../../core/constants/validation';

interface FormFieldProps {
  error : string;
  onBlur?: () => void;
}

export class FormField extends Block<FormFieldProps|any> {
  constructor(props: FormFieldProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  validate() {
    // @ts-ignore
    if (!VALIDATION_RULES[this.refs.input.getContent()!.name].test(this.refs.input.getContent()!.value)) {
      console.warn('Validation Failed:', VALIDATION_ERRORS[this.refs.input.getContent()!.name]);
      // @ts-ignore
      return VALIDATION_ERRORS[this.refs.input.getContent()!.name];
    }
    console.warn('Validation Passed');
    return '';
  }

  render() {
    return this.compile(template, this.props);
  }
}
