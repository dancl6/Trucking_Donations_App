import { useReducer } from 'react';
import { USER_LIST, LOAD_LIST } from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case USER_LIST:
            return {
                ...state,
                Trucking_User: [...action.Trucking_User]
              };
      case LOAD_LIST:
        return {
          ...state,
          Load: [...action.Load]
        };
    default: 
        return state;
    }

};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}