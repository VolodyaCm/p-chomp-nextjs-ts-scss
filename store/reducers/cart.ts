import CartProductType from '@prtypes/CartProduct';
import { ActionMap } from './';

export enum Types {
  Add = 'CART_ADD_PRODUCT',
  Delete = 'CART_DELETE_PRODUCT',
  ChangeQuantity = 'CHANGE_QUANTITY',
}

type CartPayload = {
  [Types.Add]: {
    cartProduct: CartProductType;
  };
  [Types.Delete]: {
    id: string;
  };
  [Types.ChangeQuantity]: {
    id: string;
    quantity: number;
  };
};

export type CartStateType = {
  items: CartProductType[];
};

export type CartActionsType =
  ActionMap<CartPayload>[keyof ActionMap<CartPayload>];

const cartReducer = (state: CartStateType, action: CartActionsType) => {
  switch (action.type) {
    case Types.Add: {
      const exist = state.items.find(
        (cp) => cp.product.id === action.payload.cartProduct.product.id
      );

      if (exist) {
        return {
          ...state,
          items: [
            ...state.items.map((p) =>
              p.product.id === action.payload.cartProduct.product.id
                ? {
                    ...action.payload.cartProduct,
                    quantity: p.quantity + action.payload.cartProduct.quantity,
                  }
                : p
            ),
          ],
        };
      }

      return { ...state, items: [...state.items, action.payload.cartProduct] };
    }
    case Types.Delete:
      return {
        ...state,
        items: state.items.filter(
          ({ product }) => product.id !== action.payload.id
        ),
      };
    case Types.ChangeQuantity:
      return {
        ...state,
        items: state.items.map((p) =>
          p.product.id === action.payload.id
            ? { ...p, quantity: action.payload.quantity }
            : p
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
