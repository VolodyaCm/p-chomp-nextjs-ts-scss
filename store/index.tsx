import cookie from 'js-cookie';
import cartReducer, { CartActionsType, CartStateType } from './reducers/cart';
import { createContext, useReducer, Dispatch, FC } from 'react';
import UserType from '@prtypes/User';
import userReducer, { UserActionsType } from './reducers/user';

const getCartItemsFromCookies = () => {
  const cartJSON = cookie.get('cart');
  if (!cartJSON) return [];
  return JSON.parse(cartJSON);
};

type StateType = {
  user: UserType | null;
  cart: CartStateType;
};

type MainReducerActionsType = CartActionsType | UserActionsType;

const initialStore: StateType = {
  user: null,
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

const mainReducer = (
  { cart, user }: StateType,
  action: MainReducerActionsType
) => ({
  cart: cartReducer(cart, action as CartActionsType),
  user: userReducer(user, action as UserActionsType),
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
