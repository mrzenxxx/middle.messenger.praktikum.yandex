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

  validate(): string {
    if (!VALIDATION_RULES[(this.refs.input.element! as HTMLInputElement).name].test((this.refs.input.element! as HTMLInputElement).value)) {
      console.warn('Validation Failed:', VALIDATION_ERRORS[(this.refs.input.element! as HTMLInputElement).name]);
      return VALIDATION_ERRORS[(this.refs.input.element! as HTMLInputElement).name];
    }
    console.warn('Validation Passed');
    return '';
  }

  render() {
    return this.compile(template, this.props);
  }
}
