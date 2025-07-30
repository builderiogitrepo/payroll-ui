import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { config } from "@/lib/config";

// Configure Redux DevTools Extension
const isDevelopment = config.isDevelopment;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: config.reduxDevTools.enabled
    ? {
        // Development/Staging: Full DevTools access
        name: config.reduxDevTools.name,
        trace: config.isDevelopment,
        traceLimit: 25,
      }
    : {
        // Production: Restricted DevTools
        name: config.reduxDevTools.name,
        // Disable certain features in production
        features: {
          pause: false,
          lock: true,
          persist: false,
          export: false,
          import: false,
          jump: false,
          skip: false,
          reorder: false,
          dispatch: false,
          test: false,
        },
      },
});

// Store is ready for use

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
