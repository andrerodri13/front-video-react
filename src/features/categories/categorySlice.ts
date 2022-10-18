import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {apiSlice} from "../api/apiSlice";
import {CategoryParams, Result, Results} from "../../types/Category";

export interface Category {
    id: string,
    name: string,
    is_active: boolean,
    created_at: string,
    updated_at: string,
    deleted_at: null | string,
    description: null | string,
}

const endpointUrl: string = "/categories";

function parseQueryParams(params: CategoryParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.perPage) {
        query.append("per_page", params.perPage.toString());
    }

    if (params.search) {
        query.append("search", params.search.toString());
    }

    if (params.isActive) {
        query.append("is_active", params.isActive.toString());
    }

    return query.toString();
}

function getCategories({page = 1, perPage = 10, search = ""}) {
    const params = {page, perPage, search, isActive: true};
    return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "DELETE",
    }
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getCategories: query<Results, CategoryParams>({
            query: getCategories,
            providesTags: ["Categories"]
        }),
        deleteCategory: mutation<Result, { id: string }>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"],
        })
    })
});

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
            state.push(action.payload);
        },
        updateCategory(state, action) {
            //find index on state of category to update
            const index = state.findIndex(
                (category) => category.id === action.payload.id
            );
            //update category on state
            state[index] = action.payload;
        },
        deleteCategory(state, action) {
            //find index on state of category to update
            const index = state.findIndex(
                (category) => category.id === action.payload.id
            );
            //delete category on state
            state.splice(index, 1);
        },
    }
})

//Selectors
export const selectCategories = (state: RootState) => state.categories;
//Select category by id
export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find((category) => category.id === id);

    return category || {
        id: "",
        name: "",
        is_active: false,
        created_at: "",
        updated_at: "",
        deleted_at: "",
        description: "",
    }
}


export default categoriesSlice.reducer;
export const {createCategory, updateCategory, deleteCategory} =
    categoriesSlice.actions;


export const {
    useGetCategoriesQuery,
    useDeleteCategoryMutation
} = categoriesApiSlice