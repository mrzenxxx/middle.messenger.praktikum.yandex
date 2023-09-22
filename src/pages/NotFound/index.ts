import Block from '../../core/Block';
import template from './notFound.hbs?raw';
import './NotFound.scss';

type NotFoundProps = Record<string, unknown>;

export class NotFound extends Block<NotFoundProps> {
  constructor(props: NotFoundProps) {
    super({
        ...props,
        className: 'not-found',
        title: '404',
        text: 'Не туда попали',
        button: 'Назад к чатам',
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
