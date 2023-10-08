import { EventBus } from './EventBus';
import set from './utils/set';

export enum StoreEvents {
    Updated = 'updated'
}

class Store extends EventBus {
  private state: any = {};

  constructor() {
    super();
    window.store = this;
  }

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    console.warn(this, `.set ${keypath}:`, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export default new Store();
