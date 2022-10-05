import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from 'store/index';
import { PersistGate } from 'redux-persist/integration/react';

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>{children}</PersistGate>
    </Provider>
);
