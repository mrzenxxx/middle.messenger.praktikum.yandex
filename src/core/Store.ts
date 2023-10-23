import { EventBus } from './EventBus';
import { Chat, Message, User } from '../types/interfacesAPI';
import set from './utils/set';

export enum StoreEvents {
    Updated = 'updated'
}

export interface State extends StringIndexed {
  user: Nullable<User>,
  currentChat: Nullable<Chat>,
  messages?: Record<number, Nullable<Message[]>>,
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

  constructor(){
    super();
    this.on(StoreEvents.Updated, () => null);
  }

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    console.warn(`Store: ${this} .set('${keypath}'):`, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState(): State {
    return this.state as State;
  }
}

export default new Store();
