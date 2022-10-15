import {createSlice} from "@reduxjs/toolkit";

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
    name: "Categoria 1",
    description: "Category Desc",
    is_active: false,
    deleted_at: null,
    created_at: "2022-03-26 21:09:59",
    updated_at: "2022-03-26 21:09:59"
}

export const initialState = [
    category,
    {...category, id: "08024f98-2819-4b05-aace-bf3f3b19217e", name: "Categoria 2"},
    {...category, id: "08024f98-2819-4b05-aace-bf3f3b19218e", name: "Categoria 3"},
    {...category, id: "08024f98-2819-4b05-aace-bf3f3b19219e", name: "Categoria 4"},
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

export default categoriesSlice.reducer;