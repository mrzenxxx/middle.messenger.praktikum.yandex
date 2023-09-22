import Block from '../../core/Block';
import template from './serverError.hbs?raw';
import './serverError.scss';

type ServerErrorProps = Record<string, unknown>;

export class ServerError extends Block<ServerErrorProps> {
  constructor(props: ServerErrorProps) {
    super({
        ...props,
        className: 'server-error',
        title: '500',
        text: 'Ошибка на сервере',
        button: 'Назад к чатам',
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
