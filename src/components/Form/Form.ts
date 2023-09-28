import Block from '../../core/Block';
import template from './Form.hbs?raw';
import './Form.scss';

interface FormProps {
    title?: string;
    type?: string;
    customStyle?: string;
    onSubmit: () => void;
}

export default class Form extends Block<FormProps | any> {
    constructor(props: FormProps) {
        super({
            ...props,
            events: {
                submit: props.onSubmit,
            },
        });
    }

    // private _value() {
    //   return (this.refs.input.element! as HTMLInputElement).value;
    // }

    // private conditionCheck() {
    //   return VALIDATION_RULES[(this.refs.input.element! as HTMLInputElement).name].test((this.refs.input.element! as HTMLInputElement).value);
    // }

    // public value() {
    //   if (!this.validate()) {
    //     return 'Validation Failed';
    //   }
    //   return this._value();
    // }

    // public validate(): boolean {
    //   if (!this.conditionCheck()) {
    //     this.setProps({
    //       ...this.props,
    //       value: this._value(),
    //       error: VALIDATION_ERRORS[(this.refs.input.element! as HTMLInputElement).name],
    //     });
    //     return false;
    //   }

    //   this.setProps({
    //     ...this.props,
    //     value: this._value(),
    //     error: null,
    //   });
    //   return true;
    // }

    render() {
        return this.compile(template, this.props);
    }
}

// export default Handlebars.compile(template);
