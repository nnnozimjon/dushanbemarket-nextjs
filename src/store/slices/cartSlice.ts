"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  images?: string;
  created_by: number;
  storeName: string;
  sizes?: string;
  colors?: string;
  selectedOptions?: productOptions;
}

interface productOptions {
  size: string;
  color: string;
}

interface CartState {
  products: Product[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

// const loadCartState = (): CartState => {
//     const savedCartState = localStorage.getItem('cartState');
//     return savedCartState ? JSON.parse(savedCartState) : initialState;
// };

const loadCartState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCartState = localStorage.getItem("cartState");
    return savedCartState ? JSON.parse(savedCartState) : initialState;
  } else {
    // If localStorage is not available (e.g., during SSR), return the initialState
    return initialState;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartState(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (typeof window !== "undefined") {
        const { products } = state;
        const existingProductIndex = products.findIndex(
          (p) => p.id === action.payload.id
        );

        if (existingProductIndex !== -1) {
          // If the product is already in the cart, update quantity
          products[existingProductIndex].quantity! += 1;
        } else {
          // If the product is not in the cart, add it
          action.payload.quantity = 1;
          products.push(action.payload);
        }

        // Update total items and total price
        state.totalItems += 1;
        state.totalPrice += action.payload.price;

        // Save updated cart state to localStorage
        // localStorage.setItem('cartState', JSON.stringify(state));
        localStorage.setItem("cartState", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      if (typeof window !== "undefined") {
        const { products } = state;
        const productIndex = products.findIndex((p) => p.id === action.payload);

        if (productIndex !== -1) {
          // If the product is in the cart, reduce quantity
          products[productIndex].quantity! -= 1;

          // If the quantity becomes 0, remove the product
          if (products[productIndex].quantity === 0) {
            state.products.splice(productIndex, 1);
          }

          // Update total items and total price
          state.totalItems -= 1;
          state.totalPrice = state.products.reduce((total, product) => {
            return total + product.price * product.quantity!;
          }, 0);
        }

        // Save updated cart state to localStorage
        // localStorage.setItem('cartState', JSON.stringify(state))
        localStorage.setItem("cartState", JSON.stringify(state));
      }
    },
    removeProductById: (state, action: PayloadAction<number>) => {
      if (typeof window !== "undefined") {
        const { products } = state;
        const productId = action.payload;

        // Find the index of the product with the given ID
        const productIndex = products.findIndex((p) => p.id === productId);

        if (productIndex !== -1) {
          // Update total items and total price
          state.totalItems -= products[productIndex].quantity || 0;
          state.totalPrice -=
            products[productIndex].price *
            (products[productIndex].quantity || 0);

          // Remove the product from the array
          products.splice(productIndex, 1);

          // Save updated cart state to localStorage
          // localStorage.setItem('cartState', JSON.stringify(state));
          localStorage.setItem("cartState", JSON.stringify(state));
        }
      }
    },
    updateSelectedOptions: (
      state,
      action: PayloadAction<{
        productId: number;
        selectedOptions: productOptions;
      }>
    ) => {
      if (typeof window !== "undefined") {
        const { products } = state;
        const { productId, selectedOptions } = action.payload;

        // Find the product in the cart
        const product = products.find((p) => p.id === productId);

        if (product) {
          if (selectedOptions.color) {
            // @ts-ignore
            product.selectedOptions = {
              ...product.selectedOptions,
              color: selectedOptions.color,
            };
          }

          if (selectedOptions.size) {
            // @ts-ignore
            product.selectedOptions = {
              ...product.selectedOptions,
              size: selectedOptions.size,
            };
          }

          // Save updated cart state to localStorage
          localStorage.setItem("cartState", JSON.stringify(state));
        }
      }
    },
    clearFullyCart: (state) => {
      if (typeof window !== "undefined") {
        state.products = [];
        state.totalItems = 0;
        state.totalPrice = 0;
        localStorage.removeItem("cartState");
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeProductById,
  updateSelectedOptions,
  clearFullyCart
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
