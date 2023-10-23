import Block from '../../core/Block';
import template from './FileInput.hbs?raw';
import Store from '../../core/Store';
import './FileInput.scss';

interface FileInputProps {
    label: string;
    onSelectFile?: () => void;
}

export class FileInput extends Block<FileInputProps | any> {
  constructor(props: FileInputProps) {
    super({
      ...props,
      onSelectFile: () => this.changeLabel(),
    });
    this.changeLabel();
  }

  private _fileName() {
    const selectedFile = this.getFile();
    if (!selectedFile) {
      return 'Выберите файл';
    }
    return selectedFile.name;
  }

  protected changeLabel() {
    this.setProps({
      ...this.props,
      label: this._fileName(),
    });
  }

  public getFile() {
    const fileInput = this.refs?.fileInput?.element as HTMLInputElement | undefined;
    if (fileInput) {
      const selectedFile = fileInput.files?.[0];
      // При вызове changeLabel() компонент переририсовывается и файл теряется, поэтому сделал через стор.
      if (selectedFile) {
        Store.set('file', selectedFile);
      }
      return selectedFile;
    }

    return null;
  }

  render() {
    return this.compile(template, this.props);
  }
}
