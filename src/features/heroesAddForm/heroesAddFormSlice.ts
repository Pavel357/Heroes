import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { IFiltersState, IFiltersList } from "../../types/heroesAddFormType";
import { RootState } from "../../store";

const initialState: IFiltersState = {
    filtersList: [],
    filtersStatusLoading: 'idle',
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState: initialState,
    reducers: {
        filtersFetching: 
            state => { 
                state.filtersStatusLoading = 'loading' 
            },
        filtersFetched:
            (state, action: PayloadAction<IFiltersList[]>) => {
                state.filtersStatusLoading = 'idle';
                state.filtersList = action.payload;
            },
        filtersFetchingError:
            state => {
                state.filtersStatusLoading = 'error'
            }
    }
})

export default filtersSlice.reducer;

export const { filtersFetching, filtersFetched, filtersFetchingError } = filtersSlice.actions;

export const fetchFiltersGet = 
    (request: <T>(url: string, method?: string, body?: null | string, headers?: HeadersInit) => Promise<T>):
    ThunkAction<void, RootState, unknown, AnyAction> =>
        (dispatch) => {
            dispatch(filtersFetching());

            request<IFiltersList[]>("http://localhost:3010/filters")
                .then(data => dispatch(filtersFetched(data)))
                .catch(() => dispatch(filtersFetchingError()))
}