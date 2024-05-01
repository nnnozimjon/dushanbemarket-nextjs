export {
    cartReducer,
    addToCart,
    removeFromCart,
    removeProductById,
} from './cartSlice'

export { userReducer, loginSuccess, logout } from './userSlice'

export {
    wishlistReducer,
    addToWishlist,
    clearWishlist,
    removeFromWishlist,
} from './wishlistSlice'

export { locationReducer, setCity } from './locationSlice'