import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { IFiltersFormState, IFiltersFormList } from "../../types/heroesFiltersType";
import { RootState } from "../../store";

const initialState: IFiltersFormState = {
    filtersFormList: [],
    filtersFormStatusLoading: 'idle',
}

const filtersFormSlice = createSlice({
    name: 'filtersForm',
    initialState: initialState,
    reducers: {
        filtersFormFetching: 
            state => { 
                state.filtersFormStatusLoading = 'loading' 
            },
        filtersFormFetched:
            (state, action: PayloadAction<IFiltersFormList[]>) => {
                state.filtersFormStatusLoading = 'idle';
                state.filtersFormList = action.payload;
            },
        filtersFormFetchingError:
            state => {
                state.filtersFormStatusLoading = 'error'
            }
    }
})

export default filtersFormSlice.reducer;

export const { filtersFormFetching, filtersFormFetched, filtersFormFetchingError } = filtersFormSlice.actions; 

export const fetchFiltersForm = (request: <T>(url: string, method?: string, body?: null | string, headers?: HeadersInit) => Promise<T>):
    ThunkAction<void, RootState, unknown, AnyAction> => 
    (dispatch) => {
        dispatch(filtersFormFetching());

        request<IFiltersFormList[]>("http://localhost:3010/filters")
            .then(data => dispatch(filtersFormFetched(data)))
            .catch(() => dispatch(filtersFormFetchingError()))
}