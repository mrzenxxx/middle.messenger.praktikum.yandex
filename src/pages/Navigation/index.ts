import Block from "../../utils/Block";
import template from "./navigation.hbs?raw";
import './Navigation.scss';

type NavigationProps = {}

export default class Navigation extends Block<NavigationProps> {

    constructor(props: NavigationProps) {
        super({
            ...props,
            className: 'navigation'
        } )
    }

    protected render() {

        console.log('nav render()', this) 
        return this.compile(
          template, this.props
        );
    }
}
