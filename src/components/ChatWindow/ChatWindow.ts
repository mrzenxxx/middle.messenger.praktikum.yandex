import Block from '../../core/Block';
import template from './ChatWindow.hbs?raw';
import './ChatWindow.scss';

export class ChatWindow extends Block<ChatWindowProps> {
    constructor(props: ChatWindowProps) {
        super({
          ...props,
        });
      }
    
      render() {
        return this.compile(template, this.props);
      }
}
