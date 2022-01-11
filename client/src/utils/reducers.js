import { useReducer } from 'react';
import { TRUCKER_LOADS, UPDATE_LOADS } from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_LOADS:
            return {
                ...state,
                Trucking_User: [...action.Trucking_User]
              };
      // case LOAD_LIST:
      //   return {
      //     ...state,
      //     Load: [...action.Load]
      //   };
        case TRUCKER_LOADS:
            return {
              ...state,
              Trucker_Loads: [...action.Trucker_Loads]
            };
    default: 
        return state;
    }

};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}