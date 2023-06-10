import {Action, combineReducers, configureStore, PreloadedState, ThunkAction} from '@reduxjs/toolkit';
import {categoriesApiSlice} from "../features/categories/categorySlice";
import {apiSlice} from "../features/api/apiSlice";
import {castMembersApiSlice} from "../features/cast/castMembersSlice";
import {genreSlice} from '../features/genre/genreSlice'

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    [castMembersApiSlice.reducerPath]: apiSlice.reducer,
    [genreSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState ?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    })
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
