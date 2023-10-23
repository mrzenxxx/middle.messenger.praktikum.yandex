import store, { StoreEvents , State } from '../core/Store';
import Block from '../core/Block';
import isEqual from '../core/utils/isEqual';


export function withStore<SP extends StringIndexed|State>(mapStateToProps: (state: Nullable<State>) => SP) {
  return function<P extends StringIndexed> (Component: new <P extends StringIndexed>(props: P) => Block<P>): Block<P&SP> {
    // как здесь укзазать
    return class extends Component<P> {
      public onChangeStoreCallback: () => void;

      constructor(props: Omit<P, keyof P>) {
        let state = mapStateToProps(store.getState());

        super({ ...(props as P), ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            (this as unknown as Block<P&SP>).setProps({ ...newState as P&SP });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        // Здесь понятно почему ругается
        super.componentWillUnmount();
        store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
