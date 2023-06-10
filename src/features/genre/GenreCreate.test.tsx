import {rest} from "msw";
import {setupServer} from "msw/node";
import {renderWithProviders, fireEvent, screen, waitFor} from "../../utils/test-utils";
import {GenreCreate} from "./GenreCreate";
import {baseUrl} from "../api/apiSlice";
import {categoryResponse} from "../mocks/category";

const handlers = [
    rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
        return res(ctx.json(categoryResponse))
    }),

    rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
        return res(ctx.status(201));
    }),

];

const server = setupServer(...handlers);
describe("GenreCreate", () => {

    afterAll(() => server.close());
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());

    it('should  render correctly', () => {
        const {asFragment} = renderWithProviders(<GenreCreate/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle submit', async () => {
        renderWithProviders(<GenreCreate/>);
        const name = screen.getByTestId("name");
        const save = screen.getByText("Save");

        await waitFor(() => {
            expect(save).toBeInTheDocument();
        });

        fireEvent.change(name, {target: {value: "test"}});
        fireEvent.click(save);

        await waitFor(() => {
            const text = screen.getByText("Genre created");
            expect(text).toBeInTheDocument();
        });
    });

    it('should handle error', async () => {
        server.use(
            rest.post(`${baseUrl}/genres`, (_, res, ctx) => {
                return res(ctx.status(500))
            })
        )
        renderWithProviders(<GenreCreate/>);
        const name = screen.getByTestId("name");
        const save = screen.getByText("Save");

        await waitFor(() => {
            expect(save).toBeInTheDocument();
        });

        fireEvent.change(name, {target: {value: "test"}});
        fireEvent.click(save);

        await waitFor(() => {
            const text = screen.getByText("Error creating genre");
            expect(text).toBeInTheDocument();
        });
    });
});