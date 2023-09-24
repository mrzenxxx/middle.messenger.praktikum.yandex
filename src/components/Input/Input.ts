import Block from "../../core/Block";
import { validate } from "../../core/validate";
import template from "./Input.hbs?raw";
import './Input.scss';

interface InputProps {
    label: string;
    type?: 'submit' | 'button',
    onBlur?: () => void;
    events: {
        blur?: () => void;
    };
    validate: () => string;
}

export class Input extends Block<InputProps | any> {
    constructor(props: InputProps) {
        super({
            ...props,
            onBlur: () => console.log('!!!!!!!!!!!'),
            validate: validate,
            events: {
                blur: props?.onBlur,
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
