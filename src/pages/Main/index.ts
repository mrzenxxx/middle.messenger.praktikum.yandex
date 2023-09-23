import Block from '../../core/Block';
import template from './main.hbs?raw';
import './Main.scss';

import {chats, messages} from '../../../assets/mocks/';


type MainProps = Record<string, unknown>;

export class Main extends Block<MainProps> {
  constructor(props: MainProps) {
    super({
        ...props,
        chats,
        messages,

    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
