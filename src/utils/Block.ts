import { EventBus } from "./EventBus";
import { nanoid } from "nanoid";

type Events = {
  INIT: string;
  FLOW_CDM: string;
  FLOW_CDU: string;
  FLOW_RENDER: string;
}

export class Block<P extends Record<string, unknown> = any> {
  static EVENTS: Events = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(8);
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: P } | null = null;
  protected props: P;
  protected refs: Record<string, Block<P>> = {};
  public children: Record<string, Block<P> | Block<P>[]> = {};
  private eventBus: () => EventBus;

  constructor(propsWithChildren: P ) {
    const eventBus = new EventBus();
    const {props, children} = this._getChildrenAndProps(propsWithChildren)
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: P) : {props: P, children: Record<string, Block | Block[]>} {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block<P> | Block<P>[]> = {};
    for (let [key , value] of Object.entries(childrenAndProps)){
        if (value instanceof Block || Array.isArray(value) && value.every((item)=> item instanceof Block)){
            children[key] = value;
        } else {
            props[key] = value;
        }
    }
    return { props: props as P, children };
  }

  private _makePropsProxy(props: P) {
    const self = this

    return new Proxy(props, {
        get(target, prop: string) {
            const value = target[prop]
            return typeof value === 'function' ? value.bind(target) : value
        },
        set(target, prop: string, value) {
            const oldTarget = { ...target }
            target[prop as keyof P] = value
            self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
            return true
        },
        deleteProperty() {
            throw new Error('Нет доступа')
        },
    })
}

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents(): void {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };
    Object.keys(events).forEach((eventName)=>{
        this._element?.addEventListener(eventName, events[eventName])
    })
  }

  private _createResources(): void {
    const { tagName } = this._meta!;
    this._element = this._createDocumentElement(tagName);
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private init(): void {
    this._createResources();
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
    const element = fragment.firstChild as HTMLElement;
    
    if (element&&this._element) {
        this._element.replaceWith(element);
    }

    this._element = element;
    this._addEvents();
  }

  protected componentDidMount(props?: P): void {}

  protected componentDidUpdate(oldProps?: P, newProps?: P): boolean {
    return true;
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = {...context, __refs: this.refs};

    Object.entries(this.children).forEach(([name, component]) => {
        if (Array.isArray(component)) {
            contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`)
        } else {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`
        }
    })

    const html = template(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({embed}: any) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment;
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child)=> {
        Array.isArray(child) ?
            child.forEach((entry)=> entry.dispatchComponentDidMount()) :
            child.dispatchComponentDidMount();
    });
  }
  

  public setProps = (nextProps: P): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  public show(): void {
    this._element!.style.display = "block";
  }
  
  public hide(): void {
    this._element!.style.display = "none";
  }
}
