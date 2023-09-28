import Block from '../../core/Block';
import template from './ChatMessageBar.hbs?raw';
import './ChatMessageBar.scss';

interface ChatMessageBarProps extends Record<string, unknown> {
  placeholder: string;
  style: string;
  value: string | null;
  error: string | null;
  onBlur: () => void;
  onSend: (event: Event) => void;
  onFocus: () => void;
}

export class ChatMessageBar extends Block<ChatMessageBarProps> {
  constructor(props: ChatMessageBarProps) {
    super({
      ...props,
      // Не получается передать строку с пробелом,
      // пробовал экранирование самое разное
      placeholder: 'Введите сообщение...',
      error: null,
      onBlur: () => {
        this.validate();
      },
      // С валидными данными вызывается только при втором нажатиии на кнопку,
      // если поле ввода находится в фокусе
      onSend: (event : Event) => {
        event.preventDefault();
        const { name } = this.refs.input.element! as HTMLInputElement;
        const value = this.value();
        console.info({
          [name]: value,
        });

        this.setProps({
          ...props,
          value: '',
          error: null,
          placeholder: 'Введите сообщение...',
        });
      },
      onFocus: () => {
        this.refs.errorMessage.setProps({
          error: null,
        })
      },
      events: {
        submit: props.onSend,
      },
    });
  }

  public validate(): boolean {
    if (!this.conditionCheck()) {
        this.refs.errorMessage.setProps({
          error: "Пустое сообщение!",
        })
      return false;
    }

    this.refs.errorMessage.setProps({
      error: null,
    });
    return true;
  }

  private conditionCheck() {
    return this._value()?.length > 0;
  }

  private _value() {
    return (this.refs.input.element as HTMLInputElement).value;
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
