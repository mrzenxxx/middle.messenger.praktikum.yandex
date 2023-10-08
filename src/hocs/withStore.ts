import store, { StoreEvents } from '../core/Store';
import { User } from '../api/AuthAPI';
import Block from '../core/Block';
import isEqual from '../core/utils/isEqual';

interface State {
    user: User;
}

export function withStore(mapStateToProps: (state: State) => Partial<State>) {
  return function<P extends object, R extends StringIndexed> (Component: typeof Block<P, R>) {
    return class WithStore extends Component<PageTransitionEvent, R> {
      private onChangeStoreCallback: () => void;

      constructor(props: P) {
        // const store = window.store;
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
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
