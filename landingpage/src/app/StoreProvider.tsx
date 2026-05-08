"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import PageChange from "@/components/PageChange";

interface ReducerProviderProps {
  children: ReactNode;
}

export function ReducerProvider({ children }: ReducerProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<PageChange />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
