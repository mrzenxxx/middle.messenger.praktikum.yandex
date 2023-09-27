import Block from '../../core/Block';
import template from './ChatMessageBar.hbs?raw';
import './ChatMessageBar.scss';

interface ChatMessageBarProps {
  placeholder: string;
  style: string;
  error: string | null;
  value: string | null;
  onBlur: () => void;
  onFocus: () => void;
  onInputChange?: () => void;
  onSend: () => void;
  onAttach: () => void;
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
      // С валидными данными вызывается только при втором нажатиии,
      // если поле ввода находится в фокусе
      onSend: () => {
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
      // События не отрабатываются, не понимаю почему
      onFocus: () => {
        console.warn('focus');
        this.setProps({
          ...props,
          value: this._value(),
          error: null,
        });
      },
      // Событие не отрабатываются, не понимаю почему
      onInputChange: () => {
        console.warn('input');
        this.setProps({
          ...props,
          value: this._value(),
          error: null,
        });
      },
      events: {
        blur: props.onBlur,
        click: props.onSend,
        focus: props.onFocus,
        input: props.onInputChange,
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
