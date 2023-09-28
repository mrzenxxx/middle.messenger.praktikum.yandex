import Block from '../../core/Block';
import template from './ChatMessageBar.hbs?raw';
import './ChatMessageBar.scss';

interface ChatMessageBarProps {
  placeholder: string;
  style: string;
  error: string | null;
  value: string | null;
  onSend: () => void;
}

export class ChatMessageBar extends Block<ChatMessageBarProps | any> {
  constructor(props: ChatMessageBarProps) {
    super({
      ...props,
      // Не получается передать строку с пробелом,
      // пробовал экранирование самое разное
      placeholder: 'Введите сообщение...',
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
        // Вылетает ошибка, поле нельзя выбрать
        // this.setProps({
        //   ...props,
        //   value: this._value(),
        //   error: null,
        // });
      },
      events: {
        submit: props.onSend,
      },
    });
  }

  public validate(): boolean {
    if (!this.conditionCheck()) {
      this.setProps({
        ...this.props,
        value: this._value(),
        placeholder: '',
        error: 'Пустое сообщение!',
      });
      return false;
    }

    this.setProps({
      ...this.props,
      value: this._value(),
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
