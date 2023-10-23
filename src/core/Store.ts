import { EventBus } from './EventBus';
import { Chat, Message, User } from '../types/interfacesAPI';
import set from './utils/set';

export enum StoreEvents {
    Updated = 'updated'
}

export interface State extends StringIndexed {
  user: Nullable<User>,
  currentChat: Nullable<Chat>,
  messages?: Record<number,Nullable<Message[]>>,
  error: Nullable<string>,
  isOpen: Nullable<boolean>,
  isOpenDialogChat: Nullable<boolean>,
  isOpenDialogDelete: Nullable<boolean>,
  isOpenDialogPassword: Nullable<boolean>,
  isOpenDialogUpload: Nullable<boolean>,
  isOpenDialogAddUser: Nullable<boolean>,
  isOpenDialogRemoveUser: Nullable<boolean>,
}

export class Store extends EventBus {
  private state: Nullable<State> = {};

  constructor() {
    super();
    // TODO в вебинаре показывали, но не понятно зачем вообще это
    window.store = this;
  }

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    console.warn(this, `.set ${keypath}:`, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState(): Nullable<State> {
    return this.state;
  }
}

export default new Store();
