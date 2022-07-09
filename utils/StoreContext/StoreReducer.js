
function StoreReducer(state, action) {
    switch(action.type) {
        // Case 1
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const checkExisting = state.cart.cartItems.find((item)=>( // Check if newItem is already in existing cart
                item.slug === newItem.slug ))
            const cartItems = checkExisting ? 
                state.cart.cartItems.map((item)=>(
                item.name === checkExisting.name ? newItem : item )) // if newitem exist, we still need to replace it, as the quantify has changed
                : [...state.cart.cartItems, newItem];
            return { ...state, cart: { ...state.cart, cartItems: cartItems } }
        // Case 2
        case 'CART_REMOVE_ITEM':
            const items = state.cart.cartItems.filter((item)=>(
                item.slug !== action.payload.slug ))
            return { ...state, cart: {...state.cart, cartItems: items }}
        // Default
        default: 
            return state;
    }
}

export default StoreReducer
