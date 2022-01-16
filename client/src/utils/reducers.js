import { useReducer } from 'react';
import {  UPDATE_TRUCKER_LOADS, ADD_TRUCKER_LOAD } from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_TRUCKER_LOADS:
            return {
                ...state,
                TruckerLoads: [...action.TruckerLoads]
              };
        case ADD_TRUCKER_LOAD:
            return {
                ...state,
                TruckerLoads: [...state.TruckerLoads, action.newItem]
              };
      // case LOAD_LIST:
      //   return {
      //     ...state,
      //     Load: [...action.Load]
      //   };
        // case TRUCKER_LOADS:
        //     return {
        //       ...state,
        //       Trucker_Loads: [...action.Trucker_Loads]
        //     };
    default: 
        return state;
    }

};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}