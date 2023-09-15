import Block from "../../utils/Block";
import template from "./navigation.hbs";

type NavigationProps = {}

export default class Navigation extends Block<NavigationProps> {

    // constructor() {
    //     super({className: 'navigation'} )
    // }

    protected render() {
        console.log('nav render()', this) 
        return this.compile(
          template, {className: 'navigation'}
        );
    }
}
