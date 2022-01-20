import { useReducer } from 'react';
import { UPDATE_USER } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
      
    default:
      return state;
  }
};

export function useUserReducer(initialState) {
  return useReducer(reducer, initialState);
}
