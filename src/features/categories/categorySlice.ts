import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface Category {
    id: string,
    name: string,
    is_active: boolean,
    created_at: string,
    updated_at: string,
    deleted_at: null | string,
    description: null | string,
}

const category: Category = {
    id: "08024f98-2819-4b05-aace-bf3f3b19216e",
    name: "Melão",
    description: "Category Desc",
    is_active: true,
    deleted_at: null,
    created_at: "2022-03-26 21:09:59",
    updated_at: "2022-03-26 21:09:59"
}

export const initialState = [
    category,
    {...category, id: "08024f98-2819-4b05-aace-bf3f3b19217e", name: "Banana", is_active: false},
    {...category, id: "08024f98-2819-4b05-aace-bf3f3b19218e", name: "Abacate"},
    {...category, id: "08024f98-2819-4b05-aace-bf3f3b19219e", name: "Morango", is_active: false},
];


const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategory(state, action) {
        },
        updateCategory(state, action) {
        },
        deleteCategory(state, action) {
        },
    }
})

//Selectors

export const selectCategories = (state: RootState) => state.categories;


export default categoriesSlice.reducer;