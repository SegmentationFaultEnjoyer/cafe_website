import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contains: JSON.parse(localStorage.getItem('cart')) ?? {count: 0, products: []}
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
        let product = action.payload;
       
        let same_product = state.contains.products.find(el => el.key === product.key);

        if(same_product) {
            same_product.amount += product.amount;
            state.contains.products = [
                ...state.contains.products.filter(el => el.key != same_product.key), 
                same_product];
        }
        else
            state.contains.products.push(product);
        
        state.contains.count += product.amount;
        
        localStorage.setItem('cart', JSON.stringify(state.contains));
    },

    deleteFromCart(state, action) {
        let productToDelete = action.payload;

        state.contains.products = state.contains.products.filter(el => el.key != productToDelete.key);
        state.contains.count -= productToDelete.amount;
        
        localStorage.setItem('cart', JSON.stringify(state.contains));
    }
  }
})

export const { addToCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer;