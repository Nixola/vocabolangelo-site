import { configureStore } from '@reduxjs/toolkit'
import {rdfStoreReducer} from "./RdfStore";

export const store = configureStore({
    reducer: rdfStoreReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch