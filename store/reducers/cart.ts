import CartProductType from '@prtypes/CartProduct';
import { ActionMap } from './';

enum Types {
  Add = 'CART_ADD_PRODUCT',
  Delete = 'CART_DELETE_PRODUCT',
}

type CartPayload = {
  [Types.Add]: {
    cartProduct: CartProductType;
  };
  [Types.Delete]: {
    id: string;
  };
};

export type CartStateType = {
  items: CartProductType[];
};

export type CartActionsType =
  ActionMap<CartPayload>[keyof ActionMap<CartPayload>];

const cartReducer = (state: CartStateType, action: CartActionsType) => {
  switch (action.type) {
    case Types.Add:
      return { ...state, items: [...state.items, action.payload.cartProduct] };
    case Types.Delete:
      return {
        ...state,
        items: state.items.filter(
          ({ product }) => product.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
