import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { cartReducer, locationReducer, userReducer, wishlistReducer } from './slices'
import { authApi, categoryApi, frontOrderApi, frontProductApi, frontWidgetApi } from './api'

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        location: locationReducer,
        [authApi.reducerPath]: authApi.reducer,
        [frontProductApi.reducerPath]: frontProductApi.reducer,
        [frontWidgetApi.reducerPath]: frontWidgetApi.reducer,
        [frontOrderApi.reducerPath]: frontOrderApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        frontProductApi.middleware,
        frontWidgetApi.middleware,
        frontOrderApi.middleware,
        categoryApi.middleware
    )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
