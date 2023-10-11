import Block from '../../core/Block';
import template from './ChatWindow.hbs?raw';
import { withStore } from '../../hocs/withStore';
import './ChatWindow.scss';

interface ChatWindowProps {
    id: number,
    title: string, 
}

export class ChatWindowBase extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ChatWindow = withStore((state)=>({...state.currentChat}))(ChatWindowBase);
