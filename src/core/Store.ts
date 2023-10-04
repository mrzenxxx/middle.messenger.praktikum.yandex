import { EventBus } from "./EventBus";
import set from "./utils/set";

export enum StoreEvents {
    Updated = 'updated'
}


class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

export default new Store();
