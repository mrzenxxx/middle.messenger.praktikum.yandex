import Block from "../../core/Block";
import template from "./ChatMessageBar.hbs?raw";
import './ChatMessageBar.scss';

interface ChatMessageBarProps {
    label: string;
    type?: 'submit' | 'button',
    onBlur?: () => void;
    events: {
        blur?: () => void;
    };
}

export class ChatMessageBar extends Block<ChatMessageBarProps | any> {
    constructor(props: ChatMessageBarProps) {
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
