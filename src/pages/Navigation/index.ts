import Block from "../../core/Block";
import template from "./navigation.hbs?raw";
import './Navigation.scss';

type NavigationProps = Record<string, unknown>

export class Navigation extends Block<NavigationProps> {

    constructor(props: NavigationProps) {
        super({
            ...props,
            className: 'navigation'
        } )
    }

    protected render() {
        return this.compile(
          template, this.props
        );
    }
}
