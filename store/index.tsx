import { createContext, useReducer, Dispatch, FC } from 'react';
import cartReducer, { CartActionsType, CartStateType } from './reducers/cart';
import cookie from 'js-cookie';

const getCartItemsFromCookies = () => {
  const cartJSON = cookie.get('cart');
  if (!cartJSON) return [];
  return JSON.parse(cartJSON);
};

type StateType = {
  cart: CartStateType;
};

type MainReducerActionsType = CartActionsType;

const initialStore: StateType = {
  cart: {
    items: getCartItemsFromCookies(),
  },
};

export const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<MainReducerActionsType>;
}>({
  state: initialStore,
  dispatch: () => null,
});

const mainReducer = ({ cart }: StateType, action: MainReducerActionsType) => ({
  cart: cartReducer(cart, action),
});

const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialStore);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default StoreProvider;
