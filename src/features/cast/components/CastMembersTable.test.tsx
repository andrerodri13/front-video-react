import {render} from "@testing-library/react";
import {CastMembersTable} from "./CastMembersTable";
import {BrowserRouter} from "react-router-dom";
import {Results} from "../../../types/CastMembers";
import {GridFilterModel} from "@mui/x-data-grid";

// type Props = {
//     data: Results | undefined;
//     perPage: number;
//     isFetching: boolean;
//     rowsPerPage?: number[];
//     handleOnPageChange: (page: number) => void;
//     handleFilterChange: (filterModel: GridFilterModel) => void;
//     handleOnPageSizeChange: (pageSize: number) => void;
//     handleDelete: (id: string) => void;
// }

const Props = {
    data: {
        data: [
            {
                id: "1",
                name: "Teste",
                type: 1,
                deleted_at: null,
                created_at: "2021-10-01T00:00:00.000000Z",
                updated_at: "2021-10-01T00:00:00.000000Z",
            },
        ],
            meta: {
                to: 1,
                from: 1,
                path: "http://localhost:8000/api/cast_members",
                total: 1,
                perPage: 1,
                lastPage: 1,
                currentPage: 1,
            },
            links: {
                first: "http://localhost:8000/api/cast_members?page=1",
                last: "http://localhost:8000/api/cast_members?page=1",
                prev: "",
                next: "",
            }
    },
    perPage: 10,
    isFetching: false,
    rowsPerPage: [10, 20, 30],
    handleOnPageChange: (page: number) => {
    },
    handleFilterChange: (filterModel: GridFilterModel) => {
    },
    handleOnPageSizeChange: (pageSize: number) => {
    },
    handleDelete: (id: string) => {
    }

}

describe("CastMemberTable", () => {
    it("Should render castMember table correctly", () => {
        const {asFragment} = render(<CastMembersTable {...Props} />, {
            wrapper: BrowserRouter
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it("Should renders CastMembersTable with loading", () => {
        const {asFragment} = render(<CastMembersTable {...Props} isFetching/>, {
            wrapper: BrowserRouter
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it("Should renders CastMembersTable with empty data", () => {
        const {asFragment} = render(
            <CastMembersTable {...Props} data={{data: [], meta: {}} as any}/>,
            {wrapper: BrowserRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("Should render correct type", () => {
        const {asFragment} = render(
            <CastMembersTable
                {...Props}
                data={{
                    data: [{...Props.data.data[0], type: 2}],
                    links: {...Props.data.links},
                    meta: {...Props.data.meta}
                }}
            />,
            {wrapper: BrowserRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });
})