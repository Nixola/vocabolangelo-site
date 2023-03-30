import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IndexedFormula} from "rdflib";
const $RDF = require("rdflib")

const initialState = {
    rdfStore: $RDF.graph()
};

const rdfStoreSlice = createSlice({
    name: 'rdfStore',
    initialState,
    reducers: {
        setRdfStore: (state, action: PayloadAction<IndexedFormula>) => {
            state.rdfStore = action.payload;
        }
    }
});

export const { setRdfStore } = rdfStoreSlice.actions;
export const rdfStoreReducer = rdfStoreSlice.reducer