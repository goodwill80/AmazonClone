import React, { createContext, useReducer } from 'react';
import StoreReducer from './StoreReducer';

const StoreContext = createContext();
const initialState = {
    cart: { cartItems: []},
}

function StoreContextProvider({ children }) {
    const [ state, dispatch ] = useReducer(StoreReducer, initialState);

    return (
    <StoreContext.Provider value={{ state, dispatch }}>
      { children }
    </StoreContext.Provider>
  )
}

export { StoreContextProvider, StoreContext };
