import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';

import heroes from '../features/heroesList/heroesListSlice';
import filters from '../features/heroesAddForm/heroesAddFormSlice';
import filtersFormSlice from '../features/heroesFilters/heroesFiltersSlice';

const stringMiddleware: Middleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: { heroes, filters, filtersFormSlice },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

