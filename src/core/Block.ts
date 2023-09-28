import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from './EventBus';
import deepEqual from './utils/deepEqual';

export default class Block<P extends Record<string, unknown>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(8);

  private _element: HTMLElement | null = null;

  protected props: P;

  protected refs: Record<string, Block<P>> = {};

  public children: Record<string, Block<P> | Block<P>[]> = {};

  private eventBus: () => EventBus;

  constructor(propsWithChildren: P) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  // eslint-disable-next-line class-methods-use-this
  private _getChildrenAndProps(childrenAndProps: P) : {props: P, children: Record<string, Block<P> | Block<P>[]>} {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block<P> | Block<P>[]> = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(childrenAndProps)) {
      if ((value instanceof Block || Array.isArray(value))
      && ((value as []).every((item : HTMLElement | HTMLInputElement) => item instanceof Block))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    }
    return { props: props as P, children };
  }

  private _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };

        // eslint-disable-next-line no-param-reassign
        target[prop as keyof P] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents(): void {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };
    Object.keys(events).forEach((eventName) => {
      if (events[eventName]) {
        this._element?.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  private _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render(): void {
    const fragment = this.render();
    this._removeEvents();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (newElement && this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected componentDidMount(props?: P): void {
    this.setProps(props as P);
  }

  protected componentDidUpdate(oldProps?: P, newProps?: P): boolean {
    if (oldProps && newProps && !deepEqual<P>(oldProps, newProps)) {
      return true;
    }
    return false;
  }

  protected compile(template: string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs };
    const html = Handlebars.compile(template)(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((entry) => entry.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  public setProps = (nextProps: P): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | HTMLInputElement | null {
    return this!._element;
  }

  public value() {
    return (this.element! as HTMLInputElement).value || null;
  }

  public show(): void {
    this.element!.style.display = 'block';
  }

  public hide(): void {
    this.element!.style.display = 'none';
  }
}
