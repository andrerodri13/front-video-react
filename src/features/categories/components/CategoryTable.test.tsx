import {render} from "@testing-library/react";
import {CategoriesTable} from "./CategoryTable";
import {BrowserRouter} from "react-router-dom";

const Props = {
    data: undefined,
    perPage: 10,
    isFetching: false,
    rowsPerPage: [10, 25, 50],
    handleOnPageChange: () => {
    },
    handleFilterChange: () => {
    },
    handleOnPageSizeChange: () => {
    },
    handleDelete: () => {
    }
}
const mockData = {
    data: [
        {
            id: "1",
            name: "Teste",
            description: "test",
            is_active: true,
            created_at: "2021-10-01T00:00:00.000000Z",
            updated_at: "2021-10-01T00:00:00.000000Z",
            deleted_at: "",
        },
    ],
    meta: {
        to: 1,
        from: 1,
        path: "http://localhost:8000/api/categories",
        total: 1,
        per_page: 1,
        last_page: 1,
        current_page: 1,
    },
    links: {
        first: "http://localhost:8000/api/categories?page=1",
        last: "http://localhost:8000/api/categories?page=1",
        prev: "",
        next: "",
    }
}
describe("CategoryTable", () => {
    it("Should render correctly", () => {
        const {asFragment} = render(<CategoriesTable {...Props}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("Should render CategoryTable with loading", () => {
        const {asFragment} = render(<CategoriesTable {...Props} isFetching={true}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("Should render CategoryTable with data", () => {
        const {asFragment} = render(<CategoriesTable {...Props} data={mockData}/>,
            {wrapper: BrowserRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("Should render CategoryTable with Inactive value", () => {
        const {asFragment} = render(
            <CategoriesTable
                {...Props}
                data={{
                    ...mockData,
                    data: [{...mockData.data[0], is_active: false}],
                }}
            />,
            {wrapper: BrowserRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

