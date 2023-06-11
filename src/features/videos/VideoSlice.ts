import {apiSlice} from "../api/apiSlice";
import {Result, Results, Video, VideoParams, VideoPayload} from "../../types/Videos";
import {Results as categoriesResults} from "../../types/Category"
import {Genres} from "../../types/Genres"
import {Results as castMembersResults} from "../../types/CastMembers"

const endpointUrl = "/videos";

export const initialState: Video = {
    id: "",
    title: "",
    rating: "",
    genres: [],
    duration: "0",
    opened: false,
    deleted_at: "",
    created_at: "",
    updated_at: "",
    categories: [],
    description: "",
    year_launched: "0",
    cast_members: [],
    thumb_file_url: "",
    video_file_url: "",
    banner_file_url: "",
    trailer_file_url: "",
};

function parseQueryParams(params: VideoParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.perPage) {
        query.append("per_page", params.perPage.toString());
    }

    if (params.search) {
        query.append("search", params.search);
    }

    if (params.isActive) {
        query.append("is_active", params.isActive.toString());
    }

    return query.toString();
}

const getVideos = ({page = 1, perPage = 10, search = ""}) => {
    const params: VideoParams = {page, perPage, search};
    return `${endpointUrl}?${parseQueryParams(params)}`;
}


function deleteVideo({id}: { id: string }) {
    return {url: `${endpointUrl}/${id}`, method: "DELETE"};
}

function getVideo({id}: { id: string }) {
    return `${endpointUrl}/${id}`;
}

function updateVideo(video: VideoPayload) {
    return {
        url: `${endpointUrl}/${video.id}`, method: "PUT", body: video,
    };
}

function createVideos(video: VideoPayload) {
    return {
        url: endpointUrl,
        method: "POST",
        body: video
    }
}

function getAllCategories() {
    return `categories?all=true`
}

function getAllGenres() {
    return `genres?all=true`
}

function getAllCastMembers() {
    return `cast_members?all=true`
}


export const videosSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        createVideo: mutation<Result, VideoPayload>({
            query: createVideos,
            invalidatesTags: ["Videos"],
        }),
        getVideos: query<Results, VideoParams>({
            query: getVideos,
            providesTags: ["Videos"],
        }),
        updateVideo: mutation<Result, VideoPayload>({
            query: updateVideo,
            invalidatesTags: ["Videos"],
        }),
        getVideo: query<Result, { id: string }>({
            query: getVideo,
            providesTags: ["Videos"],
        }),

        getAllCategories: query<categoriesResults, void>({
            query: getAllCategories,
            providesTags: ["Categories"]
        }),

        getAllGenres: query<Genres, void>({
            query: getAllGenres,
            providesTags: ["Genres"]
        }),
        getAllCastMembers: query<castMembersResults, void>({
            query: getAllCastMembers,
            providesTags: ["CastMembers"]
        }),
        deleteVideo: mutation<Result, { id: string }>({
            query: deleteVideo,
            invalidatesTags: ["Videos"],
        })
    }),
});

export const {
    useCreateVideoMutation,
    useGetVideosQuery,
    useGetVideoQuery,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
    useGetAllCategoriesQuery,
    useGetAllGenresQuery,
    useGetAllCastMembersQuery,
} = videosSlice