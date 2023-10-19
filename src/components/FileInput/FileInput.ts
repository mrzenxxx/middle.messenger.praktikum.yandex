import Block from '../../core/Block';
import template from './FileInput.hbs?raw';
import './FileInput.scss';

interface FileInputProps {
    name: string;
    label: string;
    className?: string;
    onBlur?: () => void;
    onChange?: () => void;
    onFocus?: () => void;
    onInput?: () => void;
}

export class FileInput extends Block<FileInputProps | any> {
  constructor(props: FileInputProps) {
    super({
      ...props,
      label: 'Выберите файл',
      events: {
        blur: props?.onBlur,
        change: props?.onChange,
        focus: props?.onFocus,
        input: props?.onInput,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
