import store, { StoreEvents , State } from '../core/Store';
import Block from '../core/Block';
import isEqual from '../core/utils/isEqual';


export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function<P extends StringIndexed> (Component: new <P extends StringIndexed>(props: P) => Block<P>) {
    return class extends Component<P> {
      public onChangeStoreCallback: () => void;

      constructor(props: Omit<P, keyof P>) {
        let state = mapStateToProps(store.getState());

        super({ ...(props as P), ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            (this as unknown as Block<P|R>).setProps({ ...newState as P|R });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
