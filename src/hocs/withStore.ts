import store, { StoreEvents , State } from '../core/Store';
import Block from '../core/Block';
import isEqual from '../core/utils/isEqual';


export function withStore(mapStateToProps: (state: State) => Partial<State>) {
  return function<P extends StringIndexed, R extends State> (Component: new <P,R>(props: P|R) => Block<StringIndexed>) {
    return class extends Component<P, R> {
      public onChangeStoreCallback: () => void;

      constructor(props: P) {
        let state = mapStateToProps((store as unknown as State).getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps((store as unknown as State).getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState as P | R });
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
