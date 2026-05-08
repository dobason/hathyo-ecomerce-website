import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import cartReducer from "@/store/cartSlice";
import userReducer from "@/store/userSlice";
import addressReducer from "@/store/addressSlice";
import paymentReducer from "@/store/paymentSlice";
import vietmapReducer from "@/store/vietmapSlice";

const cartPersistConfig = {
  key: "cart",
  storage: storageSession,
  whitelist: [
    "carts",
    "cartItems",
    "totalItems",
    "recentlyViewed",
    "totalChooseItem",
    "totalPrice",
    "choose",
  ],
};

const addressPersistConfig = {
  key: "addresses",
  storage: storageSession,
  whitelist: [
    "addresses",
    "addressSelected",
    "totalElements",
    "totalPages",
    "currentPage",
  ],
};

const userPersistConfig = {
  key: "user",
  storage: storageSession,
  whitelist: ["userInfo"],
};

const paymentPersistConfig = {
  key: "payment",
  storage: storageSession,
  whitelist: ["selectedShippingMethods", "merchantShippingMethods"],
};

const vietmapPersistConfig = {
  key: "vietmap",
  storage: storageSession,
  whitelist: [
    "geocodes",
  ],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedAddressReducer = persistReducer(
  addressPersistConfig,
  addressReducer
);
const persistedVietmapReducer = persistReducer(
  vietmapPersistConfig,
  vietmapReducer
);

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedPaymentReducer = persistReducer(
  paymentPersistConfig,
  paymentReducer
);

const rootReducer = combineReducers({
  cart: persistedCartReducer,
  address: persistedAddressReducer,
  user: persistedUserReducer,
  payment: persistedPaymentReducer,
  vietmap: persistedVietmapReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store); // Create persistor

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
