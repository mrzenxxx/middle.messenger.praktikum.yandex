import Block from "../../core/Block";
import template from "./ChatSearchBar.hbs?raw";
import './ChatSearchBar.scss';

interface ChatSearchBarProps {
    onBlur?: () => void;
    events: {
    };
}

export class ChatSearchBar extends Block<ChatSearchBarProps | any> {
    constructor(props: ChatSearchBarProps) {
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
