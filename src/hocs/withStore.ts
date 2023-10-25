import store, { StoreEvents, State } from '../core/Store';
import Block from '../core/Block';
import isEqual from '../core/utils/isEqual';

export function withStore<SP extends StringIndexed|State>(mapStateToProps: (state: State) => Partial<State>) {
  return function<P extends StringIndexed & SP> (Component: typeof Block<P>) {
    return class extends Component {
      public onChangeStoreCallback: () => void;

      constructor(props: P) {
        let state = mapStateToProps(store.getState());

        super({ ...(props as P), ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            (this as Block<P&SP>).setProps({ ...newState as P&SP });
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
