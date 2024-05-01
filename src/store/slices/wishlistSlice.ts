"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
    products: Product[]
}

interface Product {
    id: number;
    name: string;
    price: number;
    images?: string
    created_by: number
    storeName: string
}

const initialState: WishlistState = loadWishlistState();

function loadWishlistState(): WishlistState {
    const savedWishlistState = localStorage.getItem('wishlistState');
    return savedWishlistState ? JSON.parse(savedWishlistState) : { products: [] };
}

function saveWishlistState(state: WishlistState) {
    localStorage.setItem('wishlistState', JSON.stringify(state));
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const { products } = state
            const newItem = action.payload;
            const existingItem = products?.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.products.push(newItem);
                saveWishlistState(state);
            }
        },
        removeFromWishlist: (state, action: PayloadAction<Product>) => {
            const { products } = state
            state.products = products.filter(item => item.id !== action.payload.id);
            saveWishlistState(state);
        },
        clearWishlist: (state) => {
            state.products = [];
            saveWishlistState(state);
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
