import Block from '../../core/Block';
import template from './Avatar.hbs?raw';
import './Avatar.scss';

interface AvatarProps extends StringIndexed {
    isOwn: boolean,
    onClick: (event: Event) => void,
    events?: {
      click?: (event: Event) => void,
    }
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events : {
        click : props?.onClick,
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
