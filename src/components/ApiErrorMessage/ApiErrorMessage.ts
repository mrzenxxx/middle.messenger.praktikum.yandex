import Block from '../../core/Block';
import template from './ApiErrorMessage.hbs?raw';
import { withStore } from '../../hocs/withStore';
import './ApiErrorMessage.scss';

interface ApiErrorMessageProps extends Record<string, unknown> {
    error: string | null,
}

class ApiErrorMessageBase extends Block<ApiErrorMessageProps> {
  constructor(props: ApiErrorMessageProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ApiErrorMessage = withStore((state)=>({error: state.error}))(ApiErrorMessageBase);
