import { createSlice } from '@reduxjs/toolkit';
const type = require('../../helpers/types.js');
const bring_soup_to_top = require('../../helpers/SoupHandler.js');

const initialState = {
  items: {}
}

export const gridSlice = createSlice({
    name: 'gridItems',
    initialState,
    reducers: {
        initItems(state, action) {
            let products = bring_soup_to_top(action.payload);
            state.items = {
                category: type.POPULAR,
                products: products.filter(el => el.hasOwnProperty('isPopular') && el.isPopular),
                init_products: products
            }
        },

        sort(state, action) {
            let items = state.items.products;
            switch (action.payload) {
                case type.PRICE_ASC:
                    items = items.sort((a, b) => a.price - b.price);
                    break;
                case type.PRICE_DESC:
                    items = items.sort((a, b) => b.price - a.price);
                    break;
                case type.ALPHABETIC:
                    items = items.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    break;
                }
            state.items.products = items;
        },

        ChangeItemsCategory(state, action) {
            const {init_products} = state.items;
            const category = action.payload;
            let newItems;

            if(category == type.POPULAR) 
                newItems = init_products.filter(el => el.hasOwnProperty('isPopular') && el.isPopular);
            else
                newItems = init_products.filter(item => item.type === category);

            state.items.products = newItems;
            state.items.category = category;
        },
        
        find(state, action) {
            state.items.category = type.SEARCH;
            state.items.products = state.items.init_products.filter(item => {
                return item.name.toLowerCase().includes(action.payload.toLowerCase());
            })
        }
    }
})

export const { initItems, sort, ChangeItemsCategory, find } = gridSlice.actions

export default gridSlice.reducer;