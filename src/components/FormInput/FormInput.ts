import Block from "../../utils/Block";
import template from "./FormInput.hbs?raw";
import './FormInput.scss';

interface FormInputProps {
    label: string;
    type?: 'submit' | 'button',
    onBlur?: () => void;
    events: {
        blur?: () => void;
    };
}

export class FormInput extends Block<FormInputProps | any> {
    constructor(props: FormInputProps) {
        super({
            ...props,
            events: {
                blur: props?.onBlur,
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
