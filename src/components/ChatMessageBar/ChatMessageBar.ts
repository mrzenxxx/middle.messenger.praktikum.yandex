import Block from '../../core/Block';
import store from '../../core/Store';
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
  onAttachImage: () => void,
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

      onFocus: () => {
        this.refs.errorMessage.setProps({
          ...this.props,
          error: null,
        });
      },

      onAttachImage: () => {
        store.nullifyError(),
        store.set('isOpenDialogUpload', true);
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
      return '';
    }
    return this._value();
  }

  render() {
    return this.compile(template, this.props);
  }
}
