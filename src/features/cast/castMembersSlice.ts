import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {apiSlice} from "../api/apiSlice";
import {CastMember, CastMemberParams, Result, Results} from "../../types/CastMembers";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
    id: "",
    name: "",
    type: 0,
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
}

function parseQueryParams(params: CastMemberParams) {
    const query = new URLSearchParams();
    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.perPage) {
        query.append("perPage", params.perPage.toString());
    }

    if (params.search) {
        query.append("search", params.search);
    }

    if (params.type) {
        query.append("type", params.type.toString());
    }

    return query.toString();
}

function getCastMembers(params: CastMemberParams) {
    const {page = 1, perPage = 10, search, type} = params;
    return `${endpointUrl}?${parseQueryParams({
        page,
        perPage,
        search,
        type
    })}`;
}

function deleteCastMember({id}: { id: string }) {
    return {
        url: `${endpointUrl}/${id}`,
        method: "DELETE"
    };
}

function createCastMember(castMember: CastMember) {
    return {
        url: endpointUrl,
        method: "POST",
        data: castMember,
    };
}

function getCastMember({id}: { id: string }) {
    return {
        method: "GET",
        url: `${endpointUrl}/${id}`,
    }
}

function updateCastMember(castMember: CastMember) {
    return {
        method: "PUT",
        url: `${endpointUrl}/${castMember.id}`,
        data: castMember,
    };
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getCastMembers: query<Results, CastMemberParams>({
            query: getCastMembers,
            providesTags: ["CastMembers"],
        }),
        getCastMember: query<Result, { id: string }>({
            query: getCastMember,
            providesTags: ['CastMembers'],
        }),
        updateCastMember: mutation<Result, CastMember>({
            query: updateCastMember,
            invalidatesTags: ['CastMembers'],
        }),
        createCastMember: mutation<Result, CastMember>({
            query: createCastMember,
            invalidatesTags: ["CastMembers"],
        }),
        deleteCastMember: mutation<Result, { id: string; }>({
            query: deleteCastMember,
            invalidatesTags: ['CastMembers'],
        }),
    }),
});

export const {
    useGetCastMembersQuery,
    useGetCastMemberQuery,
    useDeleteCastMemberMutation,
    useCreateCastMemberMutation,
    useUpdateCastMemberMutation,
} = castMembersApiSlice
