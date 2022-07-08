
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

        default: 
            return state;
    }
}

export default StoreReducer
