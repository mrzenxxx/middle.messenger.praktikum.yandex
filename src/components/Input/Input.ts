import Block from "../../core/Block";
import template from "./Input.hbs?raw";
import './Input.scss';

interface InputProps {
    label: string;
    type?: 'submit' | 'button',
    onBlur?: () => void;
    events: {
        blur?: () => void;
    };
}

export class Input extends Block<InputProps | any> {
    constructor(props: InputProps) {
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
