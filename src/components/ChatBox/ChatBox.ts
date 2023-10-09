import Block from '../../core/Block';
import template from './ChatBox.hbs?raw';
import './ChatBox.scss';

interface ChatBoxProps {
    isActive: boolean,
    onClick: () => void,
}

export class ChatBox extends Block<ChatBoxProps> {
    constructor(props: DialogProps) {
        super({
          ...props,
        });
      }
    
      render() {
        return this.compile(template, this.props);
      }
}
