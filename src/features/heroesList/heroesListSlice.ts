import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { IHeroesState, IHeroesList } from "../../types/heroesType";
import { RootState } from "../../store";


const initialState: IHeroesState = {
    heroesList: [],
    heroesStatusLoading: 'idle',
    heroesFilter: 'all'
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: initialState,
    reducers: {
        heroesFetching: 
            state => { 
                state.heroesStatusLoading = 'loading' 
            },
        heroesFetched:
            (state, action: PayloadAction<IHeroesList[]>) => {
                state.heroesStatusLoading = 'idle';
                state.heroesList = action.payload;
            },
        heroesFetchingError:
            state => {
                state.heroesStatusLoading = 'error'
            },
        heroesAdded:
            (state, action: PayloadAction<IHeroesList>) => {
                state.heroesList.push(action.payload);
            },
        heroesDelete:
            (state, action: PayloadAction<string | number>) => {
                state.heroesList = state.heroesList.filter(item => item.id !== action.payload);
            },
        heroesFilter:
            (state, action: PayloadAction<string>) => {
                state.heroesStatusLoading = 'idle';
                state.heroesFilter = action.payload;
            },
    }
})

export default heroesSlice.reducer;

export const { heroesFetching, heroesFetched, heroesFetchingError, heroesAdded, heroesDelete, heroesFilter } = heroesSlice.actions;

export const fetchHeroesGet = 
    (request: <T>(url: string, method?: string, body?: null | string, headers?: HeadersInit) => Promise<T>):
    ThunkAction<void, RootState, unknown, AnyAction> =>
        (dispatch) => {
            dispatch(heroesFetching());

            request<IHeroesList[]>("http://localhost:3010/heroes")
                .then(data => dispatch(heroesFetched(data)))
                .catch(() => dispatch(heroesFetchingError()))
}

export const fetchHeroesPost = 
    (request: <T>(url: string, method?: string, body?: null | string, headers?: HeadersInit) => Promise<T>, dataHero: IHeroesList):
    ThunkAction<void, RootState, unknown, AnyAction> =>
        (dispatch) => {
            request<IHeroesList>("http://localhost:3010/heroes", 'POST', JSON.stringify(dataHero))
                .then(data => dispatch(heroesAdded(data)))
                .catch(() => dispatch(heroesFetchingError()))
}

export const fetchHeroesDelete = 
    (request: <T>(url: string, method?: string, body?: null | string, headers?: HeadersInit) => Promise<T>, id: string | number):
    ThunkAction<void, RootState, unknown, AnyAction> =>
        (dispatch) => {
            request<string | number>(`http://localhost:3010/heroes/${id}`, 'DELETE')
                .then(data => dispatch(heroesDelete(id)))
                .catch(() => dispatch(heroesFetchingError()))
}
