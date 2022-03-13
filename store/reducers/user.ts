import UserType from '@prtypes/User';
import { ActionMap } from './';

export enum Types {
  Add = 'ADD_USER',
  Delete = 'DELETE_USER',
}

type UserPayload = {
  [Types.Add]: {
    user: UserType;
  };
  [Types.Delete]: undefined;
};

export type UserActionsType =
  ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

const userReducer = (state: UserType | null, action: UserActionsType) => {
  switch (action.type) {
    case Types.Add:
      return action.payload.user;
    case Types.Delete:
      return null;
    default:
      return state;
  }
};

export default userReducer;
