import Block from './Block';
import isEqual from './utils/isEqual';
import render from './utils/render';

export interface BlockConstructable {
    new(props: StringIndexed): Block<StringIndexed>;
  }

export default class Route {
  private block: Nullable<Block<StringIndexed>> = null;

  private _pathname: string;

  private readonly _blockClass: BlockConstructable;

  private readonly _root: string;

  constructor(pathname: string, view: BlockConstructable, rootQuery: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._root = rootQuery;
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this._blockClass({});
    }
    render(this._root, this.block);
  }
}
