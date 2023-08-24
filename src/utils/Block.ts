import { EventBus } from "./EventBus";
import { nanoid } from "nanoid";

type Props = {
    [key: string]: string | number | boolean | {[key: string] : unknown} | unknown[]
  };

//type EventHandler = (...args: unknown[]) => void;

interface Events {
  INIT: string;
  FLOW_CDM: string;
  FLOW_CDU: string;
  FLOW_RENDER: string;
}

export class Block {
  static EVENTS: Events = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(8);
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: Props } | null = null;
  protected props: Props;
  protected refs: Record<string, Block> = {};
  public children: Record<string, Block> = {};
  private eventBus: () => EventBus;

  constructor(tagName: string = "div", props: Props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta!;
    this._element = this._createDocumentElement(tagName);
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidMount(oldProps?: Props): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
    return true;
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    this._element!.innerHTML = block;
    //this.addEvents();
  }

  // Методы, которые должны быть реализованы в подклассах
  protected render(): string {
    return "";
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;
  
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }
  
  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }
  
  public show(): void {
    this.element!.style.display = "block";
  }
  
  public hide(): void {
    this.element!.style.display = "none";
  }
}
