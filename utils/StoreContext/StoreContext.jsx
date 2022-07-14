import React, { createContext, useReducer } from 'react';
import StoreReducer from './StoreReducer';
import Cookies from 'js-cookie';

const StoreContext = createContext();

const initialState = {
    // cart: { cartItems: []},
    cart: Cookies.get('cart') 
    ? JSON.parse(Cookies.get('cart')) 
    : { cartItems: [] }
}

function StoreContextProvider({ children }) {
    const [ state, dispatch ] = useReducer(StoreReducer, initialState);

    console.log(state);
    return (
    <StoreContext.Provider value={{ state, dispatch }}>
      { children }
    </StoreContext.Provider>
  )
}

export { StoreContextProvider, StoreContext };
