import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";

interface WishlistState {
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  images?: string;
  created_by: number;
  storeName: string;
  sizes?: string;
  colors?: string;
}

const initialState: WishlistState = { products: [] };

function loadWishlistState(): WishlistState {
  const savedWishlistState = getCookie("wishlistState");
  return savedWishlistState ? JSON.parse(savedWishlistState) : initialState;
}

function saveWishlistState(state: WishlistState) {
  setCookie("wishlistState", JSON.stringify(state));
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlistState(),
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const { products } = state;
      const newItem = action.payload;
      const existingItem = products.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.products.push(newItem);
        saveWishlistState(state);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<Product>) => {
      const { products } = state;
      state.products = products.filter((item) => item.id !== action.payload.id);
      saveWishlistState(state);
    },
    clearWishlist: (state) => {
      state.products = [];
      saveWishlistState(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
