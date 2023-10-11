import Block from '../../core/Block';
import template from './Avatar.hbs?raw';
import './Avatar.scss';

interface AvatarProps extends StringIndexed {
    isOwn: boolean,
};

export class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super({
            ...props,
        })
    }
    render() {
        return this.compile(template, this.props);
    }
}
