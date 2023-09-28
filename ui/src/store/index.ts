import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { authSlice, userSlice } from "../reducers";
import { rootSaga } from "../sagas";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
const sagaMiddleWare = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["isFetching"],
};
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === "production") {
      return getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleWare);
    } else {
      return getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(logger).concat(sagaMiddleWare);
    }
  },
});

const persister = persistStore(store);

export { store, persister };
sagaMiddleWare.run(rootSaga);
