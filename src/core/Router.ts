import Block from './Block';
import isEqual from './utils/isEqual';
import render from './utils/render';

interface BlockConstructable {
  new(props: StringIndexed): Block<StringIndexed>;
}

class Route {
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

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private currentRoute: Nullable<Route> = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public use(pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#app');
