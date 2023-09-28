import Block from '../../core/Block';
import template from './ErrorMessage.hbs?raw';
import './ErrorMessage.scss';

interface ErrorMessageProps extends Record<string, unknown> {
    style: string,
    error: string | null,
}

export class ErrorMessage extends Block<ErrorMessageProps>{
    constructor(props: ErrorMessageProps) {
        super({
            ...props,
        })
    }
    render(){
        return this.compile(template, this.props)
    }
}
