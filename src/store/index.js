import { configureStore } from "@reduxjs/toolkit"
import counterReducer from '../features/counterSlice'
import shopReducer from '../features/shopSlice'
import { shopApi } from "../services/shop"
import { ordersApi } from "../services/orders"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        counterReducer,
        shopReducer,
        cartReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware, ordersApi.middleware),
})

setupListeners(store.dispatch)