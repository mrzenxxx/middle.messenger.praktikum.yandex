import Block from '../../core/Block';
import template from './ChatHeader.hbs?raw';
import './ChatHeader.scss';

interface ChatHeaderProps {};

export class ChatHeader extends Block<ChatHeaderProps> {
    constructor(props: ChatHeaderProps) {
        super({
          ...props,
        });
      }
    
      render() {
        return this.compile(template, this.props);
      }
}
