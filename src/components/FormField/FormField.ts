import Block from '../../core/Block';
import template from './FormField.hbs?raw';
import './FormField.scss';
import { VALIDATION_RULES, VALIDATION_ERRORS } from '../../core/constants/validation';

interface FormFieldProps {
  name : string,
  value : string,
  error : string | null,
  isActive: boolean,
  onBlur?: () => void,
}

export class FormField extends Block<FormFieldProps|any> {
  constructor(props: FormFieldProps) {
    super({
      ...props,
      error: null,
      onBlur: () => this.validate(),
    });
  }

  private _value() {
    return (this.refs.input.element! as HTMLInputElement).value;
  }

  private conditionCheck() : boolean {
    return VALIDATION_RULES[(this.refs.input.element! as HTMLInputElement).name]?.test((this.refs.input.element! as HTMLInputElement).value);
  }

  public value() {
    if (!this.validate()) {
      return '';
    }
    return this._value();
  }

  public validate() : boolean {
    if (!this.conditionCheck()) {
      this.refs.errorMessage.setProps({
        ...this.props,
        value: this._value(),
        error: VALIDATION_ERRORS[(this.refs.input.element! as HTMLInputElement).name],
      });
      return false;
    }

    this.refs.errorMessage.setProps({
      ...this.props,
      value: this._value(),
      error: null,
    });
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
