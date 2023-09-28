import Block from '../../core/Block';
import template from './ChatMessageBar.hbs?raw';
import './ChatMessageBar.scss';

interface ChatMessageBarProps extends Record<string, unknown> {
  placeholder: string,
  style: string,
  value: string | null,
  error: string | null,
  onBlur: () => void,
  onSend: (event: Event) => void,
  onFocus: () => void,
  events?: {
    submit?: (event: Event) => void,
    blur?: () => void,
    focus?: () => void,
  }
}

export class ChatMessageBar extends Block<ChatMessageBarProps> {
  constructor(props: ChatMessageBarProps) {
    super({
      ...props,
      error: null,
      // Не получается передать строку с пробелом,
      // пробовал экранирование самое разное, ничего не помогает
      placeholder: 'Введите сообщение',
      onBlur: () => {
        this.validate();
      },

      onSend: (event : Event) => {
        event.preventDefault();
        const { name } = this.refs.messageInput.element! as HTMLInputElement;
        const value = this.value();
        console.info({
          [name]: value,
        });

        if (this.validate()) {
          this.setProps({
            ...props,
            value: '',
            error: null,
            placeholder: 'Введите сообщение...',
          });
        }
      },
      onFocus: () => {
        this.refs.errorMessage.setProps({
          ...this.props,
          error: null,
        });
      },
      events: {
        submit: props.onSend,
        // События, добавленные сюда, по логике должны передаваться
        // в this.refs.messageInput.setProps вместе со всем остальным,
        // но почему-то не работает так
        // blur: props.onBlur,
        // focus: props.onFocus,
      },
    });
  }

  public validate(): boolean {
    if (!this.conditionCheck()) {
      this.refs.errorMessage.setProps({
        ...this.props,
        error: 'Пустое сообщение!',
      });
      this.refs.messageInput.setProps({
        ...this.props,
        placeholder: '',
        events: {
          // к описаному выше, всё работает только когда я явно передаю
          // события сюда явно (иначе при перерендеренге они отваливаются)
          focus: this.props.onFocus,
          blur: this.props.onBlur,
        },
      });
      return false;
    }

    this.refs.errorMessage.setProps({
      ...this.props,
      error: null,
    });
    return true;
  }

  private conditionCheck() {
    return this._value()?.length > 0;
  }

  private _value() {
    return (this.refs.messageInput.element as HTMLInputElement).value;
  }

  public value() {
    if (!this.validate()) {
      return 'Validation Failed';
    }
    return this._value();
  }

  render() {
    return this.compile(template, this.props);
  }
}
