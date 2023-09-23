import Block from "../../core/Block";
import template from "./ChatSettingsBar.hbs?raw";
import './ChatSettingsBar.scss';

interface ChatSettingsBarProps {};

export class ChatSettingsBar extends Block<ChatSettingsBarProps | any> {
    constructor(props: ChatSettingsBarProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
