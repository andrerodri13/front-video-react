import {renderWithProviders} from "../../../utils/test-utils";
import {GenresTable} from "./GenresTable";
import {GenreForm} from "./GenreForm";


const Props = {
    genre: {
        id: "1",
        name: "test",
        categories: [],
        isActive: true,
        deleted_at: null,
        created_at: "2022-10-20T08:28:21+0000",
        updated_at: "2022-10-20T08:28:21+0000",
        Description: "Action",
        pivot: {
            genre_id: "1",
            category_id: "1"
        },
    },
    isLoading: false,
    isDisabled: false,
    handleSubmit: jest.fn(),
    handleChange: jest.fn()
};

const mockData = {
    data: [
        {
            id: "1",
            name: "test",
            isActive: true,
            deleted_at: null,
            created_at: "2021-09-01T00:00:00.000000Z",
            updated_at: "2021-09-01T00:00:00.000000Z",
            categories: [],
            description: "test",
            pivot: {
                genre_id: "1",
                category_id: "1",
            },
        },
    ],
    links: {
        first: "http://localhost:8000/api/genres?page=1",
        last: "http://localhost:8000/api/genres?page=1",
        prev: "",
        next: "",
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: "http://localhost:8000/api/genres",
        per_page: 15,
        to: 1,
        total: 1,
    },
};
describe("GenreForm", () => {

    it('should render correctly', () => {
        const {asFragment} = renderWithProviders(<GenreForm {...Props}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with loading', () => {
        const {asFragment} = renderWithProviders(<GenreForm {...Props} isLoading={true}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render GenderForm with data', () => {
        const {asFragment} = renderWithProviders(
            <GenreForm
                {...Props}
                genre={mockData.data[0]}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});